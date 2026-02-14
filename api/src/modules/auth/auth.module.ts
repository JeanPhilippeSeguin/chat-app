import { Module } from '@nestjs/common';

import { AppAuthGuard, GoogleAuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { AppConfigModule } from '../app-config/app-config.module';
import { SessionSerializer } from './auth.serializer';
import { GoogleStrategy } from './auth.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AppConfigModule, UserModule],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    GoogleAuthGuard,
    AppAuthGuard,
    SessionSerializer,
    AuthService,
  ],
})
export class AuthModule {}
