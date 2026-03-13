import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { type Request } from 'express';

import { CreateChannelMessageDto } from './inputs/channel-message.input';
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

  @Post()
  async createChannelMessage(
    @Req() request: Request,
    @Param('channelUUID') channelUUID: string,
    @Body() body: CreateChannelMessageDto,
  ): Promise<boolean> {
    try {
      const userUUID = request.user?.uuid;

      if (!userUUID) {
        throw new Error('create_channel_message_missing_user_uuid');
      }

      return await this.channelMessageService.createChannelMessage(
        userUUID,
        channelUUID,
        body,
      );
    } catch (exception) {
      this.logger.error(exception);
      throw new BadRequestException();
    }
  }
}
