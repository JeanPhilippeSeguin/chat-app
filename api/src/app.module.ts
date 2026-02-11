import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { AppDatabaseModule } from './config/database/app-database.module';

@Module({
  imports: [AppConfigModule, AppDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
