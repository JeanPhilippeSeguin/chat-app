import passport from 'passport';
import session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';

import { AppSessionService } from './modules/app-session/app-session.service';
import { AppConfigService } from './modules/app-config/app-config.service';
import { SocketIoAdapter } from './modules/socket/socket-io.adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appConfigService = app.get(AppConfigService);

  app.enableCors({
    origin: appConfigService.get('webappUrl'),
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const sessionOptions =
    appConfigService.get<session.SessionOptions>('session');

  const { namespace, ...config } = appConfigService.redisConfig;

  if (sessionOptions) {
    sessionOptions.store = await AppSessionService.startSessionStore(config);
  }

  const middlewares: RequestHandler[] = [
    session(sessionOptions) as RequestHandler,
    passport.initialize() as RequestHandler,
    passport.session() as RequestHandler,
  ];

  app.useWebSocketAdapter(
    new SocketIoAdapter(app, appConfigService.get('webappUrl'), middlewares),
  );

  middlewares.forEach((middleware) => app.use(middleware));

  await app.listen(3000);
}
void bootstrap();
