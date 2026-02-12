import { Injectable } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserStatus } from './user.model';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly userProfileService: UserProfileService,
  ) {}

  public async findActiveUserByUserUUID(userUUID: string): Promise<UserEntity> {
    if (!userUUID) {
      return;
    }

    return this.repository.findOne({
      where: {
        uuid: Equal(userUUID),
        status: Equal(UserStatus.ENABLED),
      },
    });
  }

  public async findUserByProviderID(providerId: string): Promise<UserEntity> {
    if (!providerId) {
      return;
    }

    return this.repository.findOne({
      where: {
        providerId: Equal(providerId),
      },
    });
  }

  public async findUserByEmail(userEmail: string): Promise<UserEntity> {
    if (!userEmail) {
      return;
    }

    return this.repository.findOne({
      where: {
        email: Equal(userEmail),
      },
    });
  }

  public async findActiveUserByEmail(userEmail: string): Promise<UserEntity> {
    if (!userEmail) {
      return;
    }

    return this.repository.findOne({
      where: {
        email: Equal(userEmail),
        status: Equal(UserStatus.ENABLED),
      },
    });
  }

  public async createUser(
    providerId: string,
    userEmail: string,
  ): Promise<UserEntity> {
    if (!providerId || !userEmail) {
      return;
    }

    return this.repository.save(
      this.repository.create({
        email: userEmail,
        providerId,
        profile: this.userProfileService.generateDefaultUserProfile(),
      }),
    );
  }
}
