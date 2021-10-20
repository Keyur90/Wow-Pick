import { HttpService } from '@nestjs/axios';
import { LoggerService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { AppModule } from '../app.module';
import { InventoryService } from './inventory.service';

describe('Inventory Service', () => {
  let httpService: HttpService;
  let inventoryService: InventoryService;
  let logger: LoggerService;

  const articleId = '28391';
  const storeId = '1759';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockedResponse: Observable<AxiosResponse<any>> = of({
    data: {
      stocksOnHand: [
        {
          updatedDateTimeUtc: '2021-05-25T04:55:07.771Z',
          fulfilmentOrg: 'WOW',
          storeId: storeId,
          articleId: articleId,
          unitOfMeasure: 'EA',
          rawUnitOfMeasure: 'EA',
          availablePostPick: 0,
        },
      ],
    },
    status: 200,
    statusText: 'Success',
    headers: {},
    config: {},
  });

  beforeEach(async () => {
    logger = { log: jest.fn(), warn: jest.fn(), error: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .setLogger(logger)
      .compile();

    inventoryService = await moduleRef.resolve<InventoryService>(InventoryService);
    httpService = await moduleRef.resolve<HttpService>(HttpService);
  });

  describe('Stock on hand should be resolved', () => {
    it('should return valid stock in hand', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => mockedResponse);
      const result = await inventoryService.getStockOnHand(articleId, storeId);
      const expected = await mockedResponse.toPromise();
      expect(result).toMatchObject(expected.data.stocksOnHand.find((article) => article.articleId == articleId));
    });
  });
});
