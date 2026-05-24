import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PublicMessageProfile } from '@chat-app/shared';

import { MessageEntity } from './message.entity';
import { AppConfigService } from '../app-config/app-config.service';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class MessageService {
  private readonly MESSAGE_SECRET_KEY_BUFFER: Buffer;

  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
    private readonly appConfigService: AppConfigService,
    private readonly userProfileService: UserProfileService,
  ) {
    const messageSecretKey = appConfigService.get<string>('messageSecretKey');
    this.MESSAGE_SECRET_KEY_BUFFER = Buffer.from(messageSecretKey, 'hex');
  }

  createMessage(iv: string, tag: string, cipherText: string): MessageEntity {
    return this.repository.create({
      content: cipherText,
      iv,
      tag,
    });
  }

  encryptMessage(plainTextContent: string): {
    cipherText: string;
    iv: string;
    tag: string;
  } {
    const iv = randomBytes(12);

    const cipher = createCipheriv(
      'aes-256-gcm',
      this.MESSAGE_SECRET_KEY_BUFFER,
      iv,
      {
        authTagLength: 16,
      },
    );

    const cipherText = Buffer.concat([
      cipher.update(plainTextContent, 'utf8'),
      cipher.final(),
    ]);

    return {
      cipherText: cipherText.toString('hex'),
      iv: iv.toString('hex'),
      tag: cipher.getAuthTag().toString('hex'),
    };
  }

  decryptMessage(iv: Buffer, tag: Buffer, cipherText: Buffer): string {
    const decipher = createDecipheriv(
      'aes-256-gcm',
      this.MESSAGE_SECRET_KEY_BUFFER,
      iv,
      {
        authTagLength: 16,
      },
    );

    decipher.setAuthTag(tag);

    return Buffer.concat([
      decipher.update(cipherText),
      decipher.final(),
    ]).toString('utf8');
  }

  getMessagePublicProfile(message: MessageEntity): PublicMessageProfile | null {
    if (!message?.uuid) {
      return null;
    }

    return {
      id: message.uuid,
      content: message.content,
      author: this.userProfileService.getUserPublicProfile(message.author.user),
      createdAt: message.createdAt.toString(),
    };
  }
}
