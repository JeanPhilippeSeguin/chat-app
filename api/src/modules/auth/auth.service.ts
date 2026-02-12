import { Injectable, Logger } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { UserStatus } from '../user/user.model';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userService: UserService) {}

  async authenticateUser(
    providerId: string,
    userEmail: string,
  ): Promise<UserEntity> {
    try {
      if (!providerId || !userEmail) {
        throw new Error('authenticate_user_invalid_or_missing_arguments');
      }

      let user = await this.userService.findUserByProviderID(providerId);

      if (user?.uuid && user?.status !== UserStatus.ENABLED) {
        throw new Error('authenticate_user_user_account_not_enabled');
      }

      if (user?.uuid) {
        this.logger.log('User found by provider ID');
        return user;
      }

      this.logger.log('User not found :: creating user');
      user = await this.userService.createUser(providerId, userEmail);

      if (!user?.uuid) {
        throw new Error('authenticate_user_failed_to_create_user');
      }

      return user;
    } catch (exception) {
      this.logger.error(exception);
      return null;
    }
  }
}
