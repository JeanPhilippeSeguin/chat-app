import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

type PassportSerializerCallback<T> = (err: null, user: T | null) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  public serializeUser(
    userUUID: string,
    cb: PassportSerializerCallback<string>,
  ): void {
    return cb(null, userUUID);
  }

  public async deserializeUser(
    userUUID: string,
    cb: PassportSerializerCallback<UserEntity>,
  ): Promise<void> {
    let user: UserEntity | null = null;

    try {
      user =
        (await this.userService.findActiveUserByUserUUID(userUUID)) || null;
    } catch {
      user = null;
    }

    return cb(null, user);
  }
}
