import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { type Request } from 'express';

import { PublicServerDetails, PublicServerProfileList } from '@chat-app/shared';
import { ServerService } from './server.service';
import { AppAuthGuard } from '../auth/auth.guard';
import { ServerUserService } from '../server-user/server-user.service';
import { ServerMemberGuard } from './guards/server-member.guard';

@Controller('server')
@UseGuards(AppAuthGuard)
export class ServerController {
  private readonly logger: Logger = new Logger(ServerController.name);
  constructor(
    private readonly serverService: ServerService,
    private readonly serverUserService: ServerUserService,
  ) {}

  @Get('list')
  async getUserServers(
    @Req() request: Request,
  ): Promise<PublicServerProfileList> {
    try {
      if (!request?.user?.uuid) {
        throw new Error('invalid_or_missing_user_uuid');
      }

      const userServers = await this.serverUserService.getUserServers(
        request.user.uuid,
      );

      const getServerPublicProfilePromises = userServers.map((userServer) =>
        this.serverService.getServerPublicProfile(userServer),
      );

      return Promise.all(getServerPublicProfilePromises);
    } catch (exception) {
      this.logger.error(exception);
      throw new BadRequestException();
    }
  }

  // Profile? Details? TBD
  @Get('/:serverUUID/details')
  @UseGuards(ServerMemberGuard)
  async getServerDetails(
    @Param('serverUUID', new ParseUUIDPipe()) serverUUID: string,
  ): Promise<PublicServerDetails> {
    try {
      const details = await this.serverService.getServerDetails(serverUUID);

      if (!details?.id) {
        throw new Error('could_not_get_server_details');
      }

      return details;
    } catch (exception) {
      this.logger.error(exception);
      throw new BadRequestException();
    }
  }
}
