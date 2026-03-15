import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ChannelType } from '@chat-app/shared';
import { AppBaseEntity } from 'src/config/database/model';
import { ServerChannelEntity } from '../server-channel/server-channel.entity';
import { ChannelMessageEntity } from '../channel-message/channel-message.entity';

@Entity('Channel')
export class ChannelEntity implements AppBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ChannelUUID' })
  uuid: string;

  @Column({ type: 'text', name: 'ChannelName', nullable: false })
  name: string;

  @Column({
    type: 'simple-enum',
    name: 'ChannelType',
    enum: ChannelType,
    default: ChannelType.TEXT,
    nullable: false,
  })
  type: ChannelType;

  @OneToOne(
    () => ServerChannelEntity,
    (serverChannelEntity) => serverChannelEntity.channel,
  )
  server: ServerChannelEntity;

  @OneToMany(
    () => ChannelMessageEntity,
    (channelMessageEntity) => channelMessageEntity.channel,
    {
      eager: false,
      nullable: false,
      cascade: false,
    },
  )
  messages: ChannelMessageEntity[];

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;
}
