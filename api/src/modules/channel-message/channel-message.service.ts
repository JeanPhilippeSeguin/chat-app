import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChannelType, PublicMessageProfile } from '@chat-app/shared';
import { CreateChannelMessageDto } from './inputs/channel-message.input';
import { ChannelMessageEntity } from './channel-message.entity';
import { ServerChannelService } from '../server-channel/server-channel.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { ServerUserService } from '../server-user/server-user.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class ChannelMessageService {
  private readonly logger: Logger = new Logger(ChannelMessageService.name);
  constructor(
    @InjectRepository(ChannelMessageEntity)
    private readonly repository: Repository<ChannelMessageEntity>,
    private readonly messageService: MessageService,
    private readonly serverUserService: ServerUserService,
    private readonly serverChannelService: ServerChannelService,
    private readonly userProfileService: UserProfileService,
  ) {}

  async getChannelMessagesByChannelUUIDWithMessage(
    channelUUID: string,
  ): Promise<ChannelMessageEntity[]> {
    if (!channelUUID) {
      return [];
    }

    return this.repository.find({
      where: {
        channel: {
          uuid: channelUUID,
        },
      },
      relations: {
        message: {
          author: {
            user: true,
          },
        },
      },
    });
  }

  async getChannelMessageList(
    channelUUID: string,
  ): Promise<PublicMessageProfile[]> {
    if (!channelUUID) {
      return [];
    }

    try {
      const channelMessages =
        await this.getChannelMessagesByChannelUUIDWithMessage(channelUUID);

      return channelMessages.map(({ message }) => ({
        id: message.uuid,
        content: this.messageService.decryptMessage(
          Buffer.from(message.iv, 'hex'),
          Buffer.from(message.tag, 'hex'),
          Buffer.from(message.content, 'hex'),
        ),
        author: this.userProfileService.getUserPublicProfile(
          message.author.user,
        ),
        createdAt: message.createdAt.toString(),
      }));
    } catch (exception) {
      this.logger.error(exception);
      return [];
    }
  }

  async createChannelMessage(
    userUUID: string,
    channelUUID: string,
    body: CreateChannelMessageDto,
  ): Promise<boolean> {
    try {
      const serverChannel =
        await this.serverChannelService.getServerChannelByChannelUUIDWithServerAndChannel(
          channelUUID,
        );

      if (!serverChannel?.channel?.uuid) {
        throw new Error('create_channel_message_channel_not_found');
      }

      if (serverChannel.channel.type !== ChannelType.TEXT) {
        throw new Error('create_channel_message_wrong_channel_type');
      }

      const serverUUID = serverChannel.server.uuid;

      const serverUser =
        await this.serverUserService.getServerUserByUserUUIDAndServerUUID(
          userUUID,
          serverUUID,
        );

      if (!serverUser?.uuid) {
        throw new Error('create_channel_message_failed_to_get_server_user');
      }

      const { iv, tag, cipherText } = this.messageService.encryptMessage(
        body.content,
      );

      const message = this.messageService.createMessage(iv, tag, cipherText);

      message.author = serverUser;

      const channelMessage = this.repository.create({
        message,
        channel: serverChannel.channel,
      });

      const savedChannelMessage = await this.repository.save(channelMessage);

      return savedChannelMessage?.uuid ? true : false;
    } catch (exception) {
      this.logger.error(exception);
      return false;
    }
  }
}
