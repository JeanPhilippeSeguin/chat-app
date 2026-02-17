import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AssetService } from './asset.service';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports: [AppConfigModule, HttpModule],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
