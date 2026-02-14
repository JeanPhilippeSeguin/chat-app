import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

type PassportSerializerCallback<T> = (
  err: Error | null,
  user: T | null,
) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private readonly logger: Logger = new Logger(SessionSerializer.name);

  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(
    userUUID: string,
    cb: PassportSerializerCallback<string>,
  ): void {
    return cb(null, userUUID);
  }

  async deserializeUser(
    userUUID: string,
    cb: PassportSerializerCallback<Express.User>,
  ): Promise<void> {
    let user: UserEntity | null = null;

    try {
      user =
        (await this.userService.findActiveUserByUserUUID(userUUID)) || null;
    } catch (exception) {
      this.logger.error(exception);
      user = null;
    }

    return cb(null, user?.uuid ? { uuid: user.uuid } : null);
  }
}
