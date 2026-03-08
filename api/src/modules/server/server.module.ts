import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserProfileModule } from '../user-profile/user-profile.module';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { ServerEntity } from './server.entity';
import { AssetModule } from '../asset/asset.module';
import { ServerUserModule } from '../server-user/server-user.module';
import { PermissionModule } from '../permission/permission.module';
import { ServerMemberGuard } from './guards/server-member.guard';
import { ServerChannelModule } from '../server-channel/server-channel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerEntity]),
    AssetModule,
    UserProfileModule,
    ServerUserModule,
    PermissionModule,
    ServerChannelModule,
  ],
  controllers: [ServerController],
  providers: [ServerService, ServerMemberGuard],
  exports: [ServerService],
})
export class ServerModule {}
