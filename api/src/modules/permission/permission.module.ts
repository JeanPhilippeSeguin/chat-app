import { Module } from '@nestjs/common';

import { PermissionService } from './permission.service';
import { ServerUserModule } from '../server-user/server-user.module';
import { ServerChannelModule } from '../server-channel/server-channel.module';

@Module({
  imports: [ServerUserModule, ServerChannelModule],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
