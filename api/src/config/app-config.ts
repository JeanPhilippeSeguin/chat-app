import { z } from 'zod';
import { CookieOptions, SessionOptions } from 'express-session';
import { StrategyOptions } from 'passport-google-oauth20';
import { DataSourceOptions } from 'typeorm';
import { RedisClientOptions } from '@keyv/redis';

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
  session: AppSessionConfig;
  redis: AppRedisConfig;
  asset: AppAssetConfig;
};

export type AppAuthConfig = StrategyOptions;

export type AppDatabaseConfig = DataSourceOptions;

export type AppRedisConfig = RedisClientOptions & {
  namespace: string;
};

export type AppAssetConfig = {
  cloudflareCdnAccountId: string;
  cloudflareCdnAccountHash: string;
  cloudflareCdnApiKey: string;
  cloudflareCdnUrl: string;
};

export type AppSessionConfig = SessionOptions;

const getSessionCookieOptions = (
  environment: AppEnvironment,
  domain: string,
): CookieOptions => {
  let cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
    domain,
  };

  if (environment === AppEnvironment.LOCAL) {
    cookieOptions = {
      ...cookieOptions,
      secure: false,
      sameSite: 'lax',
    };
  }

  return cookieOptions;
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
  SESSION_COOKIE_DOMAIN: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_USER: z.string(),
  REDIS_PASSWORD: z.string().min(32),
  REDIS_NAMESPACE: z.string(),

  CLOUDFLARE_CDN_ACCOUNT_ID: z.string(),
  CLOUDFLARE_CDN_ACCOUNT_HASH: z.string(),
  CLOUDFLARE_CDN_API_KEY: z.string(),
  CLOUDFLARE_IMAGE_DELIVERY_URL: z.url(),
});

const appConfig: () => AppConfig = () => {
  const env = envSchema.parse(process.env);
  return {
    environment: env.ENVIRONMENT,
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
      rolling: true,
      cookie: getSessionCookieOptions(
        env.ENVIRONMENT,
        env.SESSION_COOKIE_DOMAIN,
      ),
    },
    redis: {
      url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
      password: env.REDIS_PASSWORD,
      username: env.REDIS_USER,
      namespace: env.REDIS_NAMESPACE,
    },
    asset: {
      cloudflareCdnAccountId: env.CLOUDFLARE_CDN_ACCOUNT_ID,
      cloudflareCdnAccountHash: env.CLOUDFLARE_CDN_ACCOUNT_HASH,
      cloudflareCdnApiKey: env.CLOUDFLARE_CDN_API_KEY,
      cloudflareCdnUrl: env.CLOUDFLARE_IMAGE_DELIVERY_URL,
    },
  };
};

export default appConfig;
