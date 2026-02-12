import { Module } from '@nestjs/common';

import { AppAuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { AppConfigModule } from '../app-config/app-config.module';
import { SessionSerializer } from './auth.serializer';
import { GoogleStrategy } from './auth.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AppConfigModule, AppConfigModule, UserModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, AppAuthGuard, SessionSerializer, AuthService],
})
export class AuthModule {}
