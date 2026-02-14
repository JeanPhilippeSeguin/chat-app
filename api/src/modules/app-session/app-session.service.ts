import { Injectable, Logger } from '@nestjs/common';
import { RedisClientOptions } from '@keyv/redis';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

@Injectable()
export class AppSessionService {
  private static readonly APP_SESSION_PREFIX: string = 'chatAppSession:';

  static async startSessionStore(
    connectOptions: RedisClientOptions,
  ): Promise<RedisStore> {
    const logger = new Logger(AppSessionService.name);
    const client = createClient(connectOptions);

    const store = new RedisStore({
      client,
      prefix: this.APP_SESSION_PREFIX,
    });

    client.on('connect', () => {
      logger.log('Successfully connected to session store');
    });

    store.on('disconnect', () => {
      logger.log('Disconnected from session store');
    });

    await client.connect();

    return store;
  }
}
