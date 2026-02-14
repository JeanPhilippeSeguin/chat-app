import KeyvRedis from '@keyv/redis';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { AppConfigService } from '../app-config/app-config.service';
import { AppCacheService } from './app-cache.service';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => {
        const { namespace, ...config } = structuredClone(
          appConfigService.redisConfig,
        );

        return {
          stores: [new KeyvRedis(config, { namespace })],
        };
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [AppCacheService],
  exports: [AppCacheService],
})
export class AppCacheModule {}
