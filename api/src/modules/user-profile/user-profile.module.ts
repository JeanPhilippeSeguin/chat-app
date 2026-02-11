import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserProfileEntity } from './user-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileEntity])],
})
export class UserProfileModule {}
