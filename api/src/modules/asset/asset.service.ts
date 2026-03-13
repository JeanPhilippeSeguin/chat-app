import { Injectable, Logger } from '@nestjs/common';
import { createHmac } from 'crypto';

import { AppConfigService } from '../app-config/app-config.service';
import { AppAssetConfig } from 'src/config/app-config';

@Injectable()
export class AssetService {
  private readonly logger: Logger = new Logger(AssetService.name);

  private DEFAULT_ASSET_EXPIRATION: number = 24 * 60 * 60;

  constructor(private readonly appConfigService: AppConfigService) {}

  private buildAssetDeliveryUrl(imageID: string): string {
    const { cloudflareCdnUrl, cloudflareCdnAccountHash } =
      this.appConfigService.get<AppAssetConfig>('asset');

    return `${cloudflareCdnUrl}/${cloudflareCdnAccountHash}/${imageID}/public`;
  }

  public getSignedUrlFromImageID(
    imageID: string,
    expiration = this.DEFAULT_ASSET_EXPIRATION,
  ): string | undefined {
    try {
      const cloudflareCdnApiKey = this.appConfigService.get<string>(
        'asset.cloudflareCdnApiKey',
      );

      const url = new URL(this.buildAssetDeliveryUrl(imageID));

      const expiry = Math.floor(Date.now() / 1000) + expiration;

      url.searchParams.set('exp', expiry.toString());

      const signature = createHmac('sha256', cloudflareCdnApiKey)
        .update(`${url.pathname}?${url.searchParams}`)
        .digest('hex');

      url.searchParams.set('sig', signature);

      return url.toString();
    } catch (exception) {
      this.logger.error(exception);
      return;
    }
  }
}
