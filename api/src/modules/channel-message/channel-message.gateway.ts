import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { IncomingMessage } from 'http';
import { OnEvent } from '@nestjs/event-emitter';

import { CreateChannelMessageDto } from './inputs/channel-message.input';
import { ChannelMessageService } from './channel-message.service';
import { ChannelMemberGuard } from '../channel/guards/channel-member.guard';
import { AppAuthGuard } from '../auth/auth.guard';

@WebSocketGateway({
  namespace: 'api/channel-message',
})
export class ChannelMessageGateway implements OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ChannelMessageGateway.name);
  private USER_SOCKET_MAP = new Map<string, Set<string>>();

  constructor(private readonly channelMessageService: ChannelMessageService) {}

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('messages')
  @UseGuards(AppAuthGuard, ChannelMemberGuard)
  async getChannelMessageList(@ConnectedSocket() client: Socket) {
    const request = client.request as IncomingMessage & { user?: Express.User };

    const channelUUID = client.handshake.query.channelUUID as string;
    const userUUID = request?.user?.uuid;
    try {
      if (!userUUID) {
        throw new Error('invalid_client_user');
      }

      if (!this.USER_SOCKET_MAP.has(userUUID)) {
        this.USER_SOCKET_MAP.set(userUUID, new Set());
      }

      this.USER_SOCKET_MAP.get(userUUID)!.add(client.id);

      await client.join(channelUUID);

      const channelMessageList =
        await this.channelMessageService.getChannelMessageList(channelUUID);

      client.emit('messages', channelMessageList);

      return true;
    } catch (exception) {
      this.logger.error(exception);
      throw new WsException('failed to get channel messages');
    }
  }

  @SubscribeMessage('create')
  @UseGuards(AppAuthGuard, ChannelMemberGuard)
  async createChannelMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: CreateChannelMessageDto,
  ): Promise<boolean> {
    try {
      const request = client.request as IncomingMessage & {
        user?: Express.User;
      };
      const channelUUID = client.handshake.query.channelUUID as string;
      const userUUID = request.user?.uuid;

      if (!userUUID) {
        throw new Error('create_channel_message_missing_user_uuid');
      }

      const messagePublicProfile =
        await this.channelMessageService.createChannelMessage(
          userUUID,
          channelUUID,
          body,
        );

      if (!messagePublicProfile?.id) {
        throw new Error(
          'create_channel_message_failed_to_create_channel_message',
        );
      }

      this.server.to(channelUUID).emit('message', messagePublicProfile);

      return true;
    } catch (exception) {
      this.logger.error(exception);
      throw new WsException('failed to create channel message');
    }
  }

  handleDisconnect(client: Socket) {
    const request = client.request as IncomingMessage & { user?: Express.User };
    const userUUID = request.user?.uuid;
    console.log('disconnect');
    if (!userUUID) {
      return;
    }

    this.USER_SOCKET_MAP.get(userUUID)?.delete(client.id);
  }

  @OnEvent('channelMessage.kicked')
  onUserChannelMessageKick({
    channelId,
    userId,
  }: {
    channelId: string;
    userId: string;
  }) {
    const userSocketIds = this.USER_SOCKET_MAP.get(userId);

    if (!userSocketIds?.size) {
      return;
    }

    this.server.in(Array.from(userSocketIds)).socketsLeave(channelId);
  }
}
