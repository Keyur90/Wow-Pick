import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import qs from 'qs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccessTokenProvider {
  private readonly logger = new Logger(AccessTokenProvider.name);

  inventoryServiceAccessToken: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  async initAccessTokens(): Promise<void> {
    await this.getInventoryServiceAccessToken();
  }

  private async getInventoryServiceAccessToken(): Promise<void> {
    let interval = 600000;
    try {
      const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'inventory-api',
        client_secret: this.configService.get<string>('inventoryServiceConfig.clientSecret'),
      });

      const response = await firstValueFrom(
        this.httpService.request({
          url: this.configService.get<string>('inventoryServiceConfig.authUrl'),
          method: 'POST',
          data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        })
      );

      const token = response.data;
      this.inventoryServiceAccessToken = token.access_token;
      interval = token.expires_in * 1000;
    } catch (error) {
      this.logger.error({ message: 'Failed to get access token for Inventory Service' }, error.stack);
    }

    //call 1 minute before token expires
    setTimeout(async () => this.getInventoryServiceAccessToken(), interval - 60000);
  }
}
