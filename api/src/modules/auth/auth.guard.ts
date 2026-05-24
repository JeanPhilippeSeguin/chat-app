import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isUUID } from 'class-validator';
import { Request } from 'express';
import { Socket } from 'socket.io';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const canActivate = (await super.canActivate(context)) as boolean;

    if (canActivate) {
      const request = context.switchToHttp().getRequest<Request>();
      await super.logIn(request);
    }

    return canActivate;
  }
}

@Injectable()
export class AppAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    let request: Request | null = null;
    let isAuthenticated = false;

    if (context.getType() === 'ws') {
      const client = context.switchToWs().getClient<Socket>();
      request = client.request as Request;

      isAuthenticated = request && isUUID(request?.user?.uuid);
    } else {
      request = context.switchToHttp().getRequest<Request>();

      isAuthenticated =
        request && isUUID(request?.user?.uuid) && request.isAuthenticated();
    }

    return isAuthenticated;
  }
}
