import KeyvRedis from '@keyv/redis';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { AppConfigService } from '../app-config/app-config.service';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.registerAsync({
      imports: [AppConfigModule],
      isGlobal: true,
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
  providers: [],
  exports: [],
})
export class AppCacheModule {}
