import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from 'src/config/app-config';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [appConfig], isGlobal: true })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
