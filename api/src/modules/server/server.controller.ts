import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { type Request } from 'express';

import { PublicServerProfileList } from '@chat-app/shared';
import { ServerService } from './server.service';
import { AppAuthGuard } from '../auth/auth.guard';

@Controller('server')
@UseGuards(AppAuthGuard)
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get('list')
  async getUserServers(
    @Req() request: Request,
  ): Promise<PublicServerProfileList> {
    try {
      if (!request?.user?.uuid) {
        throw new Error('invalid_or_missing_user_uuid');
      }

      const userServers = await this.serverService.getUserServers(
        request.user.uuid,
      );

      const getServerPublicProfilePromises = userServers.map((userServer) =>
        this.serverService.getServerPublicProfile(userServer),
      );

      return Promise.all(getServerPublicProfilePromises);
    } catch {
      throw new BadRequestException();
    }
  }
}
