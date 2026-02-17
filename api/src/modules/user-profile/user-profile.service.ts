import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PublicUserProfile } from '@chat-app/shared';
import { UserProfileEntity } from './user-profile.entity';
import { UserEntity } from '../user/user.entity';
import { AssetService } from '../asset/asset.service';

const USER_PROFILE_DEFAULT_PICTURES = [
  '6de6e11a-d46f-4496-8b0d-2754adc74801',
  'cc0a15d3-ff60-4de8-c6db-f25ddc1ebb01',
  '4d8fbc60-778f-46af-9465-94b3f232f401',
  '3fa041e8-2250-4226-5bcc-a0ec8ad15501',
  'f2636a39-5197-4ca5-ae20-f31ce6548901',
  '1deb0d26-e8c7-4e46-268f-b25a03633801',
  '5192bf2d-d3c4-47fe-d72a-d4872aa64501',
];

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly repository: Repository<UserProfileEntity>,
    private readonly assetService: AssetService,
  ) {}

  public generateDefaultUserProfile(): UserProfileEntity {
    return this.repository.create({
      username: 'Unknown',
      picture:
        USER_PROFILE_DEFAULT_PICTURES[
          Math.floor(Math.random() * USER_PROFILE_DEFAULT_PICTURES.length)
        ],
    });
  }

  public async getUserPublicProfile(
    user: UserEntity,
  ): Promise<PublicUserProfile> {
    if (!user?.profile?.picture || !user?.profile?.username) {
      throw new Error('get_user_public_profile_missing_profile');
    }

    return {
      id: user.uuid,
      username: user.profile.username,
      picture:
        (await this.assetService.getSignedUrlFromImageID(
          user.profile.picture,
        )) || '',
    };
  }
}
