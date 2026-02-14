import { Module } from '@nestjs/common';

import { AppSessionService } from './app-session.service';

@Module({ providers: [AppSessionService], exports: [AppSessionService] })
export class AppSessionModule {}
