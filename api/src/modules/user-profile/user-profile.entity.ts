import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AppBaseEntity } from 'src/config/database/model';
import { UserEntity } from '../user/user.entity';

@Entity('UserProfile')
export class UserProfileEntity implements AppBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'UserProfileUUID' })
  uuid: string;

  @Column({ name: 'Username', type: 'varchar', nullable: false, length: 50 })
  username: string;

  @Column({
    name: 'ProfilePicture',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  picture: string;

  @OneToOne(() => UserEntity, (user) => user.profile, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'UserUUID' })
  user: UserEntity;

  @UpdateDateColumn({ name: 'UpdatedAt', nullable: false })
  updatedAt: Date;

  @CreateDateColumn({ name: 'CreatedAt', nullable: false })
  createdAt: Date;
}
