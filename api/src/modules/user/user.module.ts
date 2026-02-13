import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserProfileModule } from '../user-profile/user-profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserProfileModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
