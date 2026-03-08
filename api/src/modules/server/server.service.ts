import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PublicServerDetails, PublicServerProfile } from '@chat-app/shared';
import { UserProfileService } from '../user-profile/user-profile.service';
import { ServerEntity } from './server.entity';
import { AssetService } from '../asset/asset.service';
import { ServerChannelService } from '../server-channel/server-channel.service';

@Injectable()
export class ServerService {
  private readonly logger: Logger = new Logger(ServerService.name);

  constructor(
    @InjectRepository(ServerEntity)
    private readonly repository: Repository<ServerEntity>,
    private readonly assetService: AssetService,
    private readonly userProfileService: UserProfileService,
    private readonly serverChannelService: ServerChannelService,
  ) {}

  async getServerByServerUUIDWithUserProfiles(
    serverUUID: string,
  ): Promise<ServerEntity | undefined | null> {
    if (!serverUUID) {
      return;
    }

    return this.repository.findOne({
      where: {
        uuid: serverUUID,
      },
      relations: {
        users: {
          user: {
            profile: true,
          },
        },
      },
    });
  }

  async getServerPublicProfile(
    server: ServerEntity,
  ): Promise<PublicServerProfile> {
    return {
      id: server.uuid,
      name: server.name,
      picture:
        (await this.assetService.getSignedUrlFromImageID(server.picture)) || '',
    };
  }

  async getServerDetails(
    serverUUID: string,
  ): Promise<PublicServerDetails | undefined> {
    try {
      const server =
        await this.getServerByServerUUIDWithUserProfiles(serverUUID);

      if (!server?.uuid) {
        throw new Error('missing_or_invalid_server');
      }

      const serverChannels =
        await this.serverChannelService.getServerChannelsByServerUUIDWithChannel(
          server.uuid,
        );

      const getUserProfilePromises = server.users.map((serverUser) =>
        this.userProfileService.getUserPublicProfile(serverUser.user),
      );

      const userProfiles = await Promise.all(getUserProfilePromises);

      return {
        ...(await this.getServerPublicProfile(server)),
        users: userProfiles,
        channels: serverChannels.map(({ channel }) => {
          return {
            id: channel.uuid,
            name: channel.name,
            type: channel.type,
          };
        }),
      };
    } catch (exception) {
      this.logger.error(exception);
      return;
    }
  }
}
