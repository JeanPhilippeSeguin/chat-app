import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserProfileEntity } from './user-profile.entity';
import { UserProfileService } from './user-profile.service';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileEntity]), AssetModule],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
