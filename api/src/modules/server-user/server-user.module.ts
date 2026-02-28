import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ServerUserEntity } from './server-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerUserEntity]), ServerUserEntity],
})
export class ServerUserModule {}
