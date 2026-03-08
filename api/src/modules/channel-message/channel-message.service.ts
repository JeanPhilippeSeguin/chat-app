import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChannelMessageEntity } from './channel-message.entity';

@Injectable()
export class ChannelMessageService {
  constructor(
    @InjectRepository(ChannelMessageEntity)
    private readonly repository: Repository<ChannelMessageEntity>,
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
}
