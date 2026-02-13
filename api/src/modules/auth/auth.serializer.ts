import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: Express.User): string {
    return user.uuid;
  }

  async deserializeUser(userUUID: string) {
    return this.userService.findActiveUserByUserUUID(userUUID);
  }
}
