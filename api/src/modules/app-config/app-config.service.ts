import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, AppDatabaseConfig } from 'src/config/app-config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<AppConfig>) {}

  get databaseConfig(): AppDatabaseConfig {
    return this.configService.get('database');
  }
}
