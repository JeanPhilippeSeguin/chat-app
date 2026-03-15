import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ServerUserEntity } from './server-user.entity';
import { ServerUserService } from './server-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServerUserEntity])],
  providers: [ServerUserService],
  exports: [ServerUserService],
})
export class ServerUserModule {}
