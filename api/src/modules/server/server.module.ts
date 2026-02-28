import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserProfileModule } from '../user-profile/user-profile.module';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { ServerEntity } from './server.entity';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerEntity]),
    AssetModule,
    UserProfileModule,
  ],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}
