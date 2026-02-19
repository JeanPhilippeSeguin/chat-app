import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PublicServerProfile } from '@chat-app/shared';
import { AppBaseEntity } from 'src/config/database/model';
import { ServerUserEntity } from '../server-user/server-user.entity';

@Entity('Server')
export class ServerEntity implements AppBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ServerUUID' })
  uuid: string;

  @Column({ name: 'Name', type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({
    name: 'Picture',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  picture: string;

  @OneToMany(() => ServerUserEntity, (serverUser) => serverUser.server, {
    eager: false,
    nullable: false,
    cascade: ['insert'],
  })
  users: ServerUserEntity[];

  @UpdateDateColumn({ name: 'UpdatedAt', nullable: false })
  updatedAt: Date;

  @CreateDateColumn({ name: 'CreatedAt', nullable: false })
  createdAt: Date;

  get serverPublicProfile(): PublicServerProfile {
    return {
      id: this.uuid,
      name: this.name,
      picture: this.picture,
    };
  }
}
