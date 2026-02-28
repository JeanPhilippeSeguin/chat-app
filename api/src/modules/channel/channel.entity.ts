import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ChannelType } from '@chat-app/shared';
import { AppBaseEntity } from 'src/config/database/model';

@Entity('Channel')
export class ChannelEntity implements AppBaseEntity {
  constructor() {}

  @PrimaryGeneratedColumn('uuid', { name: 'ChannelUUID' })
  uuid: string;

  @Column({
    type: 'simple-enum',
    name: 'ChannelType',
    enum: ChannelType,
    nullable: false,
  })
  type: ChannelType;

  @Column({ type: 'text', name: 'ChannelName', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;
}
