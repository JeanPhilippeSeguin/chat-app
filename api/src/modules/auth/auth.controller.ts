import { Controller, Get, HttpCode, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';

import { AppAuthGuard } from './auth.guard';
import { AppConfigService } from '../app-config/app-config.service';

@Controller('auth/google')
@UseGuards(AppAuthGuard)
export class AuthController {
  constructor(private readonly appConfigService: AppConfigService) {}

  @Get()
  @HttpCode(204)
  public initiateGoogleAuth() {}

  @Get('redirect')
  authenticateUser(@Res() response: Response) {
    const redirectUrl = this.appConfigService.get<string>('webappUrl');

    if (!redirectUrl) {
      return response.redirect('/');
    }

    return response.redirect(redirectUrl);
  }
}
