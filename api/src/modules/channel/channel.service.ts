import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ChannelEntity } from './channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly repository: Repository<ChannelEntity>,
  ) {}

  async getChannelByChannelUUIDWithServer(
    channelUUID: string,
  ): Promise<ChannelEntity | undefined | null> {
    if (!channelUUID) {
      return;
    }

    return this.repository.findOne({
      where: {
        uuid: channelUUID,
      },
      relations: {
        server: true,
      },
    });
  }
}
