import { Injectable } from '@nestjs/common';
import { ConfigService, Path } from '@nestjs/config';

import {
  AppAuthConfig,
  AppConfig,
  AppDatabaseConfig,
  AppRedisConfig,
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

  get redisConfig(): AppRedisConfig {
    return this.configService.get<AppRedisConfig>('redis');
  }

  public get<T>(configKey: Path<AppConfig>): T {
    return this.configService.get(configKey, { infer: true });
  }
}
