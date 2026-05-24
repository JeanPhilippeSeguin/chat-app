import { isUUID } from 'class-validator';
import { Request } from 'express';
import { Socket } from 'socket.io';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

import { PermissionService } from 'src/modules/permission/permission.service';

@Injectable()
export class ChannelMemberGuard implements CanActivate {
  private readonly logger: Logger = new Logger(ChannelMemberGuard.name);

  constructor(private readonly permissionService: PermissionService) {}
  async canActivate(context: ExecutionContext) {
    try {
      let request = context.switchToHttp().getRequest<Request>();
      let channelUUID: unknown = request.params?.channelUUID;

      if (context.getType() === 'ws') {
        const client = context.switchToWs().getClient<Socket>();
        request = client.request as Request;
        channelUUID = client.handshake.query.channelUUID;
      }

      const userUUID = request.user?.uuid;
      const isValidUserUUID = !!userUUID && isUUID(userUUID);
      const isValidChannelUUID =
        !!channelUUID && typeof channelUUID === 'string' && isUUID(channelUUID);

      if (!isValidUserUUID || !isValidChannelUUID) {
        throw new Error('channel_member_guard_invalid_params');
      }

      return await this.permissionService.isUserChannelServerMember(
        userUUID,
        channelUUID as string,
      );
    } catch (exception) {
      this.logger.error(exception);
      return false;
    }
  }
}
