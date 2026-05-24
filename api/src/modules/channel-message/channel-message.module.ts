import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelMessageController } from './channel-message.controller';
import { ChannelMessageService } from './channel-message.service';
import { ChannelMessageEntity } from './channel-message.entity';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { PermissionModule } from '../permission/permission.module';
import { MessageModule } from '../message/message.module';
import { ServerUserModule } from '../server-user/server-user.module';
import { ServerChannelModule } from '../server-channel/server-channel.module';
import { ChannelMessageGateway } from './channel-message.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelMessageEntity]),
    UserProfileModule,
    PermissionModule,
    MessageModule,
    ServerUserModule,
    ServerChannelModule,
  ],
  controllers: [ChannelMessageController],
  providers: [ChannelMessageService, ChannelMessageGateway],
  exports: [ChannelMessageService],
})
export class ChannelMessageModule {}
