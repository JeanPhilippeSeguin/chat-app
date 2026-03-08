import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServerUserEntity } from './server-user.entity';
import { ServerEntity } from '../server/server.entity';
import { UserStatus } from '../user/user.model';
import { ServerUserMembershipStatus } from './server-user.model';

@Injectable()
export class ServerUserService {
  private readonly logger: Logger = new Logger(ServerUserService.name);

  constructor(
    @InjectRepository(ServerUserEntity)
    private readonly repository: Repository<ServerUserEntity>,
  ) {}

  // TODO: move
  async getUserServers(userUUID: string): Promise<ServerEntity[]> {
    try {
      const userServers =
        await this.getServerUserListByUserUUIDWithServer(userUUID);

      return userServers.map((userServer) => userServer.server);
    } catch (exception) {
      this.logger.error(exception);
      return [];
    }
  }

  async getServerUserByUserUUIDAndServerUUID(
    userUUID: string,
    serverUUID: string,
  ): Promise<ServerUserEntity | undefined | null> {
    if (!userUUID || !serverUUID) {
      return;
    }

    return this.repository.findOne({
      where: {
        membershipStatus: ServerUserMembershipStatus.ACTIVE,
        server: {
          uuid: serverUUID,
        },
        user: {
          status: UserStatus.ENABLED,
          uuid: userUUID,
        },
      },
    });
  }

  async getServerUserListByUserUUIDWithServer(
    userUUID: string,
  ): Promise<ServerUserEntity[]> {
    if (!userUUID) {
      return [];
    }

    return this.repository.find({
      where: {
        user: {
          uuid: userUUID,
        },
      },
      relations: {
        server: true,
      },
    });
  }
}
