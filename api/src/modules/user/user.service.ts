import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserStatus } from './user.model';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly userProfileService: UserProfileService,
  ) {}

  public async findActiveUserByUserUUID(
    userUUID?: string,
  ): Promise<UserEntity | undefined | null> {
    if (!userUUID) {
      return;
    }

    return this.repository.findOne({
      where: {
        uuid: userUUID,
        status: UserStatus.ENABLED,
      },
    });
  }

  public async findUserByProviderID(
    providerId: string,
  ): Promise<UserEntity | undefined | null> {
    if (!providerId) {
      return;
    }

    return this.repository.findOne({
      where: {
        providerId,
      },
    });
  }

  public async findUserByEmail(
    userEmail: string,
  ): Promise<UserEntity | undefined | null> {
    if (!userEmail) {
      return;
    }

    return this.repository.findOne({
      where: {
        email: userEmail,
      },
    });
  }

  public async findActiveUserByEmail(
    userEmail: string,
  ): Promise<UserEntity | undefined | null> {
    if (!userEmail) {
      return;
    }

    return this.repository.findOne({
      where: {
        email: userEmail,
        status: UserStatus.ENABLED,
      },
    });
  }

  public async createNewUser(
    providerId: string,
    userEmail: string,
  ): Promise<UserEntity | undefined> {
    try {
      if (!providerId || !userEmail) {
        throw new Error('create_new_user_invalid_or_missing_arguments');
      }

      const userEmailAlreadyTaken = await this.findUserByEmail(userEmail);

      if (userEmailAlreadyTaken) {
        throw new Error('create_new_user_user_email_already_exists');
      }

      return await this.createUser(providerId, userEmail);
    } catch (exception) {
      this.logger.error(exception);
      return;
    }
  }

  private async createUser(
    providerId: string,
    userEmail: string,
  ): Promise<UserEntity | undefined> {
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
