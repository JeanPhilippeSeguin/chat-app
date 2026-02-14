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

@Module({
  imports: [
    AppConfigModule,
    AppDatabaseModule,
    AppCacheModule,
    AppSessionModule,
    AuthModule,
    UserProfileModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
