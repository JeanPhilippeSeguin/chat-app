import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { PublicMessageProfile } from '@chat-app/shared';
import { ChannelMessageService } from './channel-message.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { ChannelMemberGuard } from '../channel/guards/channel-member.guard';
import { AppAuthGuard } from '../auth/auth.guard';

@Controller('channel-message/:channelUUID')
@UseGuards(AppAuthGuard, ChannelMemberGuard)
export class ChannelMessageController {
  private readonly logger: Logger = new Logger(ChannelMessageController.name);

  constructor(
    private readonly channelMessageService: ChannelMessageService,
    private readonly userProfileService: UserProfileService,
  ) {}

  @Get('/list')
  async getChannelMessageList(
    @Param('channelUUID', new ParseUUIDPipe()) channelUUID: string,
  ): Promise<PublicMessageProfile[]> {
    try {
      const channelMessages =
        await this.channelMessageService.getChannelMessagesByChannelUUIDWithMessage(
          channelUUID,
        );

      const loadChannelMessagePromises = channelMessages.map(
        async ({ message }) => {
          return {
            id: message.uuid,
            content: message.content,
            author: await this.userProfileService.getUserPublicProfile(
              message.author.user,
            ),
            createdAt: message.createdAt,
          };
        },
      );

      return Promise.all(loadChannelMessagePromises);
    } catch (exception) {
      this.logger.error(exception);
      throw new BadRequestException();
    }
  }
}
