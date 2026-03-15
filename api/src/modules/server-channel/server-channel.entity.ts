import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AppBaseEntity } from 'src/config/database/model';
import { ServerEntity } from '../server/server.entity';
import { ChannelEntity } from '../channel/channel.entity';

@Entity('ServerChannel')
export class ServerChannelEntity implements AppBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ServerChannelUUID' })
  uuid: string;

  @ManyToOne(() => ServerEntity, (server) => server.channels, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'ServerUUID' })
  server: ServerEntity;

  @OneToOne(() => ChannelEntity, (channel) => channel.server, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'ChannelUUID' })
  channel: ChannelEntity;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;
}
