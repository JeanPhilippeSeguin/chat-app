import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServerChannelEntity } from './server-channel.entity';
import { ServerChannelService } from './server-channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServerChannelEntity])],
  providers: [ServerChannelService],
  exports: [ServerChannelService],
})
export class ServerChannelModule {}
