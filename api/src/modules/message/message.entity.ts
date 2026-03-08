import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ServerUserEntity } from '../server-user/server-user.entity';
import { AppBaseEntity } from 'src/config/database/model';
import { ChannelMessageEntity } from '../channel-message/channel-message.entity';

@Entity('Message')
export class MessageEntity implements AppBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'MessageUUID' })
  uuid: string;

  @OneToOne(
    () => ChannelMessageEntity,
    (channelMessageEntity) => channelMessageEntity.message,
    {
      nullable: false,
      eager: false,
      cascade: false,
    },
  )
  channel: ChannelMessageEntity;

  @ManyToOne(
    () => ServerUserEntity,
    (serverUserEntity) => serverUserEntity.messages,
    {
      nullable: false,
      cascade: false,
      eager: false,
    },
  )
  @JoinColumn({ name: 'ServerUserUUID' })
  author: ServerUserEntity;

  @Column({ name: 'Content', type: 'varchar', nullable: false, length: 255 })
  content: string;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;
}
