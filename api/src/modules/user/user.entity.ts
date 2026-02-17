import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserProfileEntity } from '../user-profile/user-profile.entity';
import { AppBaseEntity } from 'src/config/database/model';
import { UserStatus } from './user.model';

@Entity('User')
export class UserEntity implements AppBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'UserUUID' })
  uuid: string;

  @Column({ name: 'Email', type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({
    name: 'ProviderID',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 50,
  })
  providerId: string;

  @OneToOne(() => UserProfileEntity, (profile) => profile.user, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  profile: UserProfileEntity;

  @Column({
    name: 'UserStatus',
    type: 'simple-enum',
    nullable: false,
    enum: UserStatus,
    default: UserStatus.ENABLED,
  })
  status: UserStatus;

  @UpdateDateColumn({ name: 'UpdatedAt', nullable: false })
  updatedAt: Date;

  @CreateDateColumn({ name: 'CreatedAt', nullable: false })
  createdAt: Date;
}
