import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ServerEntity } from '../server/server.entity';
import { AppBaseEntity } from 'src/config/database/model';
import { MessageEntity } from '../message/message.entity';
import { ServerUserMembershipStatus } from './server-user.model';

@Entity('ServerUser')
export class ServerUserEntity implements AppBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ServerUserUUID' })
  uuid: string;

  @ManyToOne(() => ServerEntity, (server) => server.users, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'ServerUUID' })
  server: ServerEntity;

  @ManyToOne(() => UserEntity, (user) => user.servers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'UserUUID' })
  user: UserEntity;

  @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.author, {
    eager: false,
    nullable: false,
    cascade: false,
  })
  messages: MessageEntity[];

  @Column({
    name: 'ServerUserMembershipStatus',
    type: 'simple-enum',
    enum: ServerUserMembershipStatus,
    default: ServerUserMembershipStatus.ACTIVE,
    nullable: false,
  })
  membershipStatus: ServerUserMembershipStatus;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;
}
