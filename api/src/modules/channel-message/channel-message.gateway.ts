import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { IncomingMessage } from 'http';

import { CreateChannelMessageDto } from './inputs/channel-message.input';
import { ChannelMessageService } from './channel-message.service';
import { ChannelMemberGuard } from '../channel/guards/channel-member.guard';
import { AppAuthGuard } from '../auth/auth.guard';

@WebSocketGateway({
  namespace: 'api/channel-message',
})
export class ChannelMessageGateway {
  private readonly logger: Logger = new Logger(ChannelMessageGateway.name);
  constructor(private readonly channelMessageService: ChannelMessageService) {}

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('messages')
  @UseGuards(AppAuthGuard, ChannelMemberGuard)
  async getChannelMessageList(@ConnectedSocket() client: Socket) {
    const channelUUID = client.handshake.query.channelUUID as string;

    try {
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
}
