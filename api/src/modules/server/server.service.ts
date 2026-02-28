import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PublicServerDetails, PublicServerProfile } from '@chat-app/shared';
import { UserProfileService } from '../user-profile/user-profile.service';
import { ServerEntity } from './server.entity';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class ServerService {
  private readonly logger: Logger = new Logger(ServerService.name);

  constructor(
    @InjectRepository(ServerEntity)
    private readonly repository: Repository<ServerEntity>,
    private readonly assetService: AssetService,
    private readonly userProfileService: UserProfileService,
  ) {}

  async getUserServers(userUUID: string): Promise<ServerEntity[]> {
    if (!userUUID) {
      return [];
    }

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

  async getUserServerByServerUUIDWithUsers(
    userUUID: string,
    serverUUID: string,
  ): Promise<ServerEntity | undefined | null> {
    if (!userUUID || !serverUUID) {
      return;
    }

    return this.repository.findOne({
      where: {
        uuid: serverUUID,
        users: {
          user: {
            uuid: userUUID,
          },
        },
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
    server: ServerEntity,
  ): Promise<PublicServerDetails | undefined> {
    try {
      if (!server?.uuid) {
        throw new Error('missing_or_invalid_server');
      }
      const serverPublicProfile = await this.getServerPublicProfile(server);

      const getUserProfilePromises = server.users.map((serverUser) =>
        this.userProfileService.getUserPublicProfile(serverUser.user),
      );

      const userProfiles = await Promise.all(getUserProfilePromises);

      return {
        ...serverPublicProfile,
        users: userProfiles,
        channels: [],
      };
    } catch (exception) {
      this.logger.error(exception);
      return;
    }
  }
}
