import { INestApplication } from '@nestjs/common';
import { ExtendedError, Server, ServerOptions, Socket } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { RequestHandler } from '@nestjs/common/interfaces';

const wrap =
  (middleware: RequestHandler<unknown>) =>
  (socket: Socket, next: (err?: ExtendedError) => void) =>
    middleware(socket.request, {} as any, next) as unknown;

export class SocketIoAdapter extends IoAdapter {
  constructor(
    app: INestApplication,
    private readonly corsOrigin: string,
    private readonly middlewares: RequestHandler[],
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, {
      ...options,
      cors: { origin: this.corsOrigin, credentials: true },
    }) as Server;

    this.middlewares.forEach((m) => server.use(wrap(m)));

    server.on('new_namespace', (namespace) => {
      this.middlewares.forEach((m) => namespace.use(wrap(m)));
    });

    return server;
  }
}
