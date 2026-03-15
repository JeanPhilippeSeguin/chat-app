import { Request } from 'express';
import { isUUID } from 'class-validator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

import { PermissionService } from 'src/modules/permission/permission.service';

@Injectable()
export class ServerMemberGuard implements CanActivate {
  private readonly logger: Logger = new Logger(ServerMemberGuard.name);

  constructor(private readonly permissionService: PermissionService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest<Request>();

      const serverUUID = request.params?.serverUUID;
      const userUUID = request.user?.uuid;

      const isValidUserUUID = !!userUUID && isUUID(userUUID);
      const isValidServerUUID =
        !!serverUUID && typeof serverUUID === 'string' && isUUID(serverUUID);

      if (!isValidUserUUID || !isValidServerUUID) {
        throw new Error('server_member_guard_invalid_params');
      }

      return await this.permissionService.isUserServerMember(
        userUUID,
        serverUUID,
      );
    } catch (exception) {
      this.logger.error(exception);
      return false;
    }
  }
}
