import { isUUID } from 'class-validator';
import { Request } from 'express';
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
      const request = context.switchToHttp().getRequest<Request>();

      const channelUUID = request.params?.channelUUID;
      const userUUID = request.user?.uuid;

      const isValidUserUUID = !!userUUID && isUUID(userUUID);
      const isValidChannelUUID =
        !!channelUUID && typeof channelUUID === 'string' && isUUID(channelUUID);

      if (!isValidUserUUID || !isValidChannelUUID) {
        throw new Error('channel_member_guard_invalid_params');
      }

      return await this.permissionService.isUserChannelServerMember(
        userUUID,
        channelUUID,
      );
    } catch (exception) {
      this.logger.error(exception);
      return false;
    }
  }
}
