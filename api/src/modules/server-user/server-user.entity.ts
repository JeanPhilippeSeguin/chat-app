import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ServerEntity } from '../server/server.entity';
import { AppBaseEntity } from 'src/config/database/model';

@Entity('ServerUserEntity')
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

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @CreateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;
}
