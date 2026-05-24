import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';
import { AppConfigModule } from '../app-config/app-config.module';
import { UserProfileModule } from '../user-profile/user-profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    AppConfigModule,
    UserProfileModule,
  ],
  exports: [MessageService],
  providers: [MessageService],
})
export class MessageModule {}
