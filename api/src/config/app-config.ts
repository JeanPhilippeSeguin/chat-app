import { DataSourceOptions } from 'typeorm';

export enum AppEnvironment {
  LOCAL = 'local',
  PRODUCTION = 'production',
}

export type AppConfig = {
  database: AppDatabaseConfig;
};

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
  database: {
    type: 'postgres',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

export default appConfig;
