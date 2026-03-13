import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServerChannelEntity } from './server-channel.entity';

@Injectable()
export class ServerChannelService {
  constructor(
    @InjectRepository(ServerChannelEntity)
    private readonly repository: Repository<ServerChannelEntity>,
  ) {}

  async getServerChannelsByServerUUIDWithChannel(
    serverUUID: string,
  ): Promise<ServerChannelEntity[]> {
    if (!serverUUID) {
      return [];
    }

    return this.repository.find({
      where: {
        server: {
          uuid: serverUUID,
        },
      },
      relations: {
        channel: true,
      },
    });
  }

  async getServerChannelByChannelUUIDWithServerAndChannel(
    channelUUID: string,
  ): Promise<ServerChannelEntity | undefined | null> {
    if (!channelUUID) {
      return;
    }

    return this.repository.findOne({
      where: {
        channel: {
          uuid: channelUUID,
        },
      },
      relations: {
        server: true,
        channel: true,
      },
    });
  }
}
