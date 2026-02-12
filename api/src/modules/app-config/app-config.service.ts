import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  AppAuthConfig,
  AppConfig,
  AppDatabaseConfig,
} from 'src/config/app-config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<AppConfig>) {}

  get databaseConfig(): AppDatabaseConfig {
    return this.configService.get('database');
  }

  get googleAuthConfig(): AppAuthConfig {
    return this.configService.get('auth');
  }

  public get<T>(configKey: keyof AppConfig): T {
    if (!configKey) {
      return null;
    }

    return this.configService.get<T>(configKey);
  }
}
