import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelEntity } from './channel.entity';
import { ChannelService } from './channel.service';
import { ChannelMemberGuard } from './guards/channel-member.guard';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity]), PermissionModule],
  providers: [ChannelService, ChannelMemberGuard],
  exports: [ChannelService],
})
export class ChannelModule {
  constructor() {}
}
