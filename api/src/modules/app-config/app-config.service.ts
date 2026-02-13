import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  AppAuthConfig,
  AppConfig,
  AppDatabaseConfig,
} from 'src/config/app-config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<AppConfig, true>) {}

  get databaseConfig(): AppDatabaseConfig {
    return this.configService.get<AppDatabaseConfig>('database');
  }

  get googleAuthConfig(): AppAuthConfig {
    return this.configService.get<AppAuthConfig>('auth');
  }

  public get<T>(configKey: keyof AppConfig): T | undefined {
    if (!configKey) {
      return;
    }

    return this.configService.get<T>(configKey);
  }
}
