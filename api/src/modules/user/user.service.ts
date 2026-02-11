import { Injectable } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserStatus } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly repository: Repository<UserEntity>) {}

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
}
