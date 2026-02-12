import { SessionOptions } from 'express-session';
import { StrategyOptions } from 'passport-google-oauth20';
import { DataSourceOptions } from 'typeorm';

export enum AppEnvironment {
  LOCAL = 'local',
  PRODUCTION = 'production',
}

export type AppConfig = {
  environment: AppEnvironment;
  apiUrl: string;
  webappUrl: string;
  database: AppDatabaseConfig;
  auth: AppAuthConfig;
  session: SessionOptions;
};

export type AppAuthConfig = StrategyOptions;

export type AppDatabaseConfig = DataSourceOptions;

const getAppEnvironment = (env: string): AppEnvironment => {
  const environment = Object.values(AppEnvironment).find(
    (appEnvironment) => appEnvironment === env,
  );

  if (!environment) {
    return AppEnvironment.LOCAL;
  }

  return environment;
};

const appConfig: () => AppConfig = () => ({
  environment: getAppEnvironment(process.env.ENVIRONMENT),
  apiUrl: process.env.APP_API_URL,
  webappUrl: process.env.APP_WEBAPP_URL,
  database: {
    type: 'postgres',
    entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
  },
  auth: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.APP_API_URL}/${process.env.GOOGLE_REDIRECT_ENDPOINT}`,
    scope: ['profile', 'email'],
    state: true,
  },
  session: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  },
});

export default appConfig;
