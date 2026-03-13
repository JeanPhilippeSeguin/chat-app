import { Injectable, Logger } from '@nestjs/common';

import { ServerUserService } from '../server-user/server-user.service';
import { ServerChannelService } from '../server-channel/server-channel.service';

@Injectable()
export class PermissionService {
  private readonly logger: Logger = new Logger(PermissionService.name);

  constructor(
    private readonly serverUserService: ServerUserService,
    private readonly serverChannelService: ServerChannelService,
  ) {}

  async isUserServerMember(
    userUUID: string,
    serverUUID: string,
  ): Promise<boolean> {
    try {
      const serverUser =
        await this.serverUserService.getServerUserByUserUUIDAndServerUUID(
          userUUID,
          serverUUID,
        );

      if (!serverUser?.uuid) {
        throw new Error('is_user_server_member_server_user_not_found');
      }

      return true;
    } catch (exception) {
      this.logger.error(exception);
      return false;
    }
  }

  async isUserChannelServerMember(
    userUUID: string,
    channelUUID: string,
  ): Promise<boolean> {
    try {
      const channel =
        await this.serverChannelService.getServerChannelByChannelUUIDWithServerAndChannel(
          channelUUID,
        );

      const serverUUID = channel?.server?.uuid;

      if (!serverUUID) {
        throw new Error('is_user_channel_server_member_server_not_found');
      }

      return await this.isUserServerMember(userUUID, serverUUID);
    } catch (exception) {
      this.logger.error(exception);
      return false;
    }
  }
}
