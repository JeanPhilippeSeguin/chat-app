import { isEmail } from 'class-validator';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { AppConfigService } from '../app-config/app-config.service';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly service: AuthService,
  ) {
    super(appConfigService.googleAuthConfig);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<string> {
    try {
      const userEmail = profile?.emails?.[0];

      if (!isEmail(userEmail?.value) || !userEmail?.verified) {
        throw new Error('validate_invalid_or_missing_user_email');
      }

      const user = await this.service.authenticateUser(
        profile.id,
        userEmail.value,
      );

      if (!user?.uuid) {
        throw new Error('validate_invalid_user');
      }

      // The return value of the validate function will be passed to the PassportSerializer.serializeUser
      return user.uuid;
    } catch (exception) {
      this.logger.error(exception);
      throw new UnauthorizedException();
    }
  }
}
