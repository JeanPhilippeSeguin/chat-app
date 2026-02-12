import { NestFactory } from '@nestjs/core';
import session from 'express-session';

import { AppConfigService } from './modules/app-config/app-config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigService = app.get(AppConfigService);

  app.setGlobalPrefix('api');

  app.use(session(appConfigService.get<session.SessionOptions>('session')));

  await app.listen(3000);
}
void bootstrap();
