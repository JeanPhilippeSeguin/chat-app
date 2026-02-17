import { Injectable, Logger } from '@nestjs/common';
import { subtle } from 'crypto';

import { AppConfigService } from '../app-config/app-config.service';
import { AppAssetConfig } from 'src/config/app-config';

@Injectable()
export class AssetService {
  private readonly logger: Logger = new Logger(AssetService.name);

  private DEFAULT_ASSET_EXPIRATION: number = 24 * 60 * 60;

  private readonly generateCryptoKeyPromise: Promise<CryptoKey>;

  constructor(private readonly appConfigService: AppConfigService) {
    this.generateCryptoKeyPromise = this.getCryptoKey();
  }

  private buildAssetDeliveryUrl(imageID: string): string {
    const { cloudflareCdnUrl, cloudflareCdnAccountHash } =
      this.appConfigService.get<AppAssetConfig>('asset');

    return `${cloudflareCdnUrl}/${cloudflareCdnAccountHash}/${imageID}/public`;
  }

  public async getSignedUrlFromImageID(
    imageID: string,
    expiration = this.DEFAULT_ASSET_EXPIRATION,
  ): Promise<string | undefined> {
    try {
      const key = await this.generateCryptoKeyPromise;

      if (!key) {
        throw new Error('get_image_signed_url_failed_generate_signing_key');
      }

      const url = new URL(this.buildAssetDeliveryUrl(imageID));

      const expiry = Math.floor(Date.now() / 1000) + expiration;

      url.searchParams.set('exp', expiry.toString());

      const signature = await subtle.sign(
        'HMAC',
        key,
        new TextEncoder().encode(`${url.pathname}?${url.searchParams}`),
      );

      url.searchParams.set('sig', this.bufferToHex(signature));

      return url.toString();
    } catch (exception) {
      this.logger.error(exception);
      return;
    }
  }

  private async getCryptoKey(): Promise<CryptoKey> {
    const cloudflareCdnApiKey = this.appConfigService.get<string>(
      'asset.cloudflareCdnApiKey',
    );

    return subtle.importKey(
      'raw',
      new TextEncoder().encode(cloudflareCdnApiKey),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
  }

  private bufferToHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);

    let hex = '';

    for (const byte of bytes) {
      hex += byte.toString(16).padStart(2, '0');
    }

    return hex;
  }
}
