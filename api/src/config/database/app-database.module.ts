import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from 'src/modules/app-config/app-config.module';
import { AppConfigService } from 'src/modules/app-config/app-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => {
        return appConfigService.databaseConfig;
      },
      inject: [AppConfigService],
    }),
  ],
})
export class AppDatabaseModule {}
