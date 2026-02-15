import { Controller, Get, HttpCode, Res, UseGuards } from '@nestjs/common';
import type { CookieOptions, Response } from 'express';

import { GoogleAuthGuard } from './auth.guard';
import { AppConfigService } from '../app-config/app-config.service';

@Controller('auth/google')
@UseGuards(GoogleAuthGuard)
export class AuthController {
  constructor(private readonly appConfigService: AppConfigService) {}

  @Get()
  @HttpCode(204)
  public initiateGoogleAuth() {}

  @Get('redirect')
  authenticateUser(@Res() response: Response) {
    const redirectUrl = this.appConfigService.get<string>('webappUrl');

    const cookieOptions =
      this.appConfigService.get<CookieOptions>('session.cookie');

    response.cookie('isAuthenticated', 'true', {
      ...cookieOptions,
      httpOnly: false,
    });

    if (!redirectUrl) {
      return response.redirect('/');
    }

    return response.redirect(redirectUrl);
  }
}
