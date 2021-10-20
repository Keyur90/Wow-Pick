import { HttpService } from '@nestjs/axios';
import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DataLoader from 'dataloader';
import { firstValueFrom } from 'rxjs';
import { AccessTokenProvider } from '../util';

@Injectable({ scope: Scope.REQUEST })
export class InventoryService {
  storeId: string;
  accessToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly accessTokenProvider: AccessTokenProvider,
    private readonly configService: ConfigService
  ) {}

  private stockOnHandLoader = new DataLoader(async (ids) => {
    const inventoryApiUrl = this.configService.get<string>('inventoryServiceConfig.baseUrl');
    const response = await firstValueFrom(
      this.httpService.get(`${inventoryApiUrl}soh/WOW-${this.storeId}`, {
        params: { articleIds: ids.join(',') },
        headers: { Authorization: `Bearer ${this.accessTokenProvider.inventoryServiceAccessToken}` },
      })
    );

    return ids.map((id) => response.data.stocksOnHand.find((article) => article.articleId === id));
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getStockOnHand(articleId: string, storeId: string): Promise<any> {
    this.storeId = storeId;
    return this.stockOnHandLoader.load(articleId);
  }
}
