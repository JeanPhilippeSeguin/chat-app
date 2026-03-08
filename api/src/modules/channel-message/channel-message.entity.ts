import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ChannelEntity } from '../channel/channel.entity';
import { MessageEntity } from '../message/message.entity';
import { AppBaseEntity } from 'src/config/database/model';

@Entity('ChannelMessage')
export class ChannelMessageEntity implements AppBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ChannelMessageUUID' })
  uuid: string;

  @ManyToOne(() => ChannelEntity, (channelEntity) => channelEntity.messages, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'ChannelUUID' })
  channel: ChannelEntity;

  @OneToOne(() => MessageEntity, (messageEntity) => messageEntity.channel, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'MessageUUID' })
  message: MessageEntity;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
