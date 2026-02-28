import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { type Request } from 'express';

import { PublicServerDetails, PublicServerProfileList } from '@chat-app/shared';
import { ServerService } from './server.service';
import { AppAuthGuard } from '../auth/auth.guard';
import { GetServerProfileDto } from './inputs/server.inputs';

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

  // Profile? Details? TBD
  @Post('profile')
  async getServerProfile(
    @Req() request: Request,
    @Body() body: GetServerProfileDto,
  ): Promise<PublicServerDetails> {
    try {
      if (!request?.user?.uuid) {
        throw new Error('invalid_or_missing_user_uuid');
      }

      const server =
        await this.serverService.getUserServerByServerUUIDWithUsers(
          request.user.uuid,
          body.id,
        );

      if (!server?.uuid) {
        throw new Error('server_not_found');
      }

      const details = await this.serverService.getServerDetails(server);

      if (!details?.id) {
        throw new Error('could_not_get_server_details');
      }

      return details;
    } catch {
      throw new BadRequestException();
    }
  }
}
