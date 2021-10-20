import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Article, ToteItem } from '@rf2/picking/data/api-contracts';
import DataLoader from 'dataloader';
import { firstValueFrom } from 'rxjs';
import { mapArticle } from '../mappings';

const FieldsToQuery =
  'referenceNumber,brand,genericName,volumeSize,perishableCode,eans,articleHierarchy,stores.articleSettings';

@Injectable({ scope: Scope.REQUEST })
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  storeId: string;
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  private articlesLoader = new DataLoader(async (ids) => {
    const articleServiceUrl = this.configService.get<string>('articleServiceConfig.baseurl');
    const articleServiceApiToken = this.configService.get<string>('articleServiceConfig.apiKey');
    const response = await firstValueFrom(
      this.httpService.get(articleServiceUrl, {
        params: {
          ids: ids.join(','),
          storeIds: this.storeId,
          fields: FieldsToQuery,
        },
        headers: { 'x-api-key': articleServiceApiToken },
      })
    );

    return ids.map((id) => response.data.articles.find((article) => article.referenceNumber === id));
  });

  async getArticle(toteItem: ToteItem, branchNo: string): Promise<Article> {
    this.storeId = branchNo;
    const actualWeightTradingDepartments = this.configService.get<string>('actualWeightTradingDepartments');
    const primaryArticle = await this.articlesLoader.load(toteItem.articleId);
    const secondaryArticle = toteItem.secondaryArticleId
      ? await this.articlesLoader.load(toteItem.secondaryArticleId)
      : null;
    return mapArticle(actualWeightTradingDepartments, toteItem, primaryArticle, secondaryArticle);
  }
}
