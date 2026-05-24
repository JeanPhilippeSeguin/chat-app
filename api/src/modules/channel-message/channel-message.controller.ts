import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { ChannelMessageService } from './channel-message.service';
import { PublicMessageProfile } from '@chat-app/shared';
import { ChannelMemberGuard } from '../channel/guards/channel-member.guard';
import { AppAuthGuard } from '../auth/auth.guard';

@Controller('channel-message/:channelUUID')
@UseGuards(AppAuthGuard, ChannelMemberGuard)
export class ChannelMessageController {
  private readonly logger: Logger = new Logger(ChannelMessageController.name);

  constructor(private readonly channelMessageService: ChannelMessageService) {}

  @Get()
  async getChannelMessageList(
    @Param('channelUUID', new ParseUUIDPipe()) channelUUID: string,
  ): Promise<PublicMessageProfile[]> {
    try {
      return this.channelMessageService.getChannelMessageList(channelUUID);
    } catch (exception) {
      this.logger.error(exception);
      throw new BadRequestException();
    }
  }
}
