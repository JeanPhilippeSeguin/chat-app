import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  PublicServerDetails,
  PublicServerProfile,
  PublicServerProfileList,
} from '@chat-app/shared';
import { UserProfileService } from '../user-profile/user-profile.service';
import { ServerEntity } from './server.entity';
import { AssetService } from '../asset/asset.service';
import { ServerChannelService } from '../server-channel/server-channel.service';
import { ServerUserService } from '../server-user/server-user.service';

@Injectable()
export class ServerService {
  private readonly logger: Logger = new Logger(ServerService.name);

  constructor(
    @InjectRepository(ServerEntity)
    private readonly repository: Repository<ServerEntity>,
    private readonly assetService: AssetService,
    private readonly userProfileService: UserProfileService,
    private readonly serverChannelService: ServerChannelService,
    private readonly serverUserService: ServerUserService,
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

  async getUserServers(userUUID: string): Promise<PublicServerProfileList> {
    if (!userUUID) {
      return [];
    }

    try {
      const userServerUsers =
        await this.serverUserService.getServerUserListByUserUUIDWithServer(
          userUUID,
        );

      return userServerUsers.map(({ server }) =>
        this.getServerPublicProfile(server),
      );
    } catch (exception) {
      this.logger.error(exception);
      return [];
    }
  }

  getServerPublicProfile(server: ServerEntity): PublicServerProfile {
    return {
      id: server.uuid,
      name: server.name,
      picture: this.assetService.getSignedUrlFromImageID(server.picture) ?? '',
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

      const serverUserProfiles = server.users.map(({ user }) =>
        this.userProfileService.getUserPublicProfile(user),
      );

      return {
        ...this.getServerPublicProfile(server),
        users: serverUserProfiles,
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
