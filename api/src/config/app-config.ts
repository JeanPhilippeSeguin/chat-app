import { z } from 'zod';
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
    return AppEnvironment.PRODUCTION;
  }

  return environment;
};

const envSchema = z.object({
  APP_ACCESS_KEY: z.string(),
  ENVIRONMENT: z.enum(AppEnvironment),
  APP_API_URL: z.url(),
  APP_WEBAPP_URL: z.url(),

  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string().min(32),
  POSTGRES_DB: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_ENDPOINT: z.string(),

  SESSION_SECRET: z.string().min(32),
});

const appConfig: () => AppConfig = () => {
  const env = envSchema.parse(process.env);
  return {
    environment: getAppEnvironment(env.ENVIRONMENT),
    apiUrl: env.APP_API_URL,
    webappUrl: env.APP_WEBAPP_URL,
    database: {
      type: 'postgres',
      entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      synchronize: env.ENVIRONMENT === AppEnvironment.LOCAL,
      invalidWhereValuesBehavior: {
        undefined: 'throw',
      },
    },
    auth: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${env.APP_API_URL}/${env.GOOGLE_REDIRECT_ENDPOINT}`,
      scope: ['profile', 'email'],
      state: true,
    },
    session: {
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    },
  };
};

export default appConfig;
