import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { PublicUserProfile } from '@chat-app/shared';
import { UserService } from './user.service';
import { AppAuthGuard } from '../auth/auth.guard';
import { UserProfileService } from '../user-profile/user-profile.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
  ) {}

  @Get('me')
  @UseGuards(AppAuthGuard)
  public async getCurrentUser(
    @Req() request: Request,
  ): Promise<PublicUserProfile> {
    try {
      const currentUser = await this.userService.findActiveUserByUserUUID(
        request.user?.uuid,
      );

      if (!currentUser?.uuid) {
        throw new Error('get_current_user_user_not_found_or_disabled');
      }

      return this.userProfileService.getUserPublicProfile(currentUser);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
