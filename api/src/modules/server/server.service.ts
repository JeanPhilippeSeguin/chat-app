import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PublicServerProfile } from '@chat-app/shared';
import { ServerEntity } from './server.entity';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerEntity)
    private readonly repository: Repository<ServerEntity>,
    private readonly assetService: AssetService,
  ) {}

  async getUserServers(userUUID: string): Promise<ServerEntity[]> {
    return this.repository.find({
      where: {
        users: {
          user: {
            uuid: userUUID,
          },
        },
      },
      select: {
        uuid: true,
        name: true,
        picture: true,
      },
    });
  }

  async getServerPublicProfile(
    server: ServerEntity,
  ): Promise<PublicServerProfile> {
    return {
      ...server.serverPublicProfile,
      picture:
        (await this.assetService.getSignedUrlFromImageID(server.picture)) || '',
    };
  }
}
