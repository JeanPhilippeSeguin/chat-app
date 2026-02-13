import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AppBaseEntity } from 'src/config/database/model';

@Entity('UserProfile')
export class UserProfileEntity implements AppBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'UserProfileUUID' })
  uuid: string;

  @Column({ name: 'Username', type: 'varchar', nullable: true, length: 50 })
  username?: string;

  @Column({
    name: 'ProfilePicture',
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  picture?: string;

  @UpdateDateColumn({ name: 'UpdatedAt', nullable: false })
  updatedAt: Date;

  @CreateDateColumn({ name: 'CreatedAt', nullable: false })
  createdAt: Date;
}
