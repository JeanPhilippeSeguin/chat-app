import passport from 'passport';
import session from 'express-session';
import { NestFactory } from '@nestjs/core';

import { AppConfigService } from './modules/app-config/app-config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigService = app.get(AppConfigService);

  app.setGlobalPrefix('api');

  app.use(session(appConfigService.get<session.SessionOptions>('session')));

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
void bootstrap();
