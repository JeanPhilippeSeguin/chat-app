import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { AppDatabaseModule } from './config/database/app-database.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AppCacheModule } from './modules/app-cache/app-cache.module';
import { AppSessionModule } from './modules/app-session/app-session.module';
import { AssetModule } from './modules/asset/asset.module';
import { ServerModule } from './modules/server/server.module';
import { ServerUserModule } from './modules/server-user/server-user.module';
import { ChannelModule } from './modules/channel/channel.module';

@Module({
  imports: [
    AppConfigModule,
    AppDatabaseModule,
    AppCacheModule,
    AppSessionModule,
    AssetModule,
    AuthModule,
    ServerModule,
    ChannelModule,
    ServerUserModule,
    UserProfileModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
