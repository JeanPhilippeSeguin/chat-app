import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserProfileEntity } from './user-profile.entity';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileEntity])],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
