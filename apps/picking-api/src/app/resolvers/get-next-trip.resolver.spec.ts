import { LoggerService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { InventoryService } from '../dataSources';
import { GetNextTripResolver } from '../resolvers';
import { AccessTokenProvider } from '../util';
import { PickingService } from './../dataSources/picking.service';

describe('GetNextTripResolver', () => {
  let getNextTripResolver: GetNextTripResolver;
  let pickingService: PickingService;
  let inventoryService: InventoryService;
  let logger: LoggerService;
  let accessTokenProvider: { inventoryServiceAccessToken: '123'; initAccessTokens: () => { return } };

  beforeEach(async () => {
    logger = { log: jest.fn(), warn: jest.fn(), error: jest.fn() };
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: AccessTokenProvider,
          useValue: accessTokenProvider,
        },
      ],
    })
      .setLogger(logger)
      .compile();

    pickingService = await moduleRef.resolve<PickingService>(PickingService);
    inventoryService = await moduleRef.resolve<InventoryService>(InventoryService);
    getNextTripResolver = await moduleRef.resolve<GetNextTripResolver>(GetNextTripResolver);
  });

  describe('getNextTrip', () => {
    it('should return GetNextTrip', async () => {
      const userName = '1474.18';
      const branchNo = '1474';
      const cacheKey = `tripDetails-userName${userName}-branchNo${branchNo}`;
      const expectedResult = await import(`../fixtures/${cacheKey}.json`);
      const mockedInventoryResponse = {
        toPromise: () =>
          Promise.resolve({
            updatedDateTimeUtc: '2021-02-24T11:56:19.63Z',
            fulfilmentOrg: 'WOW',
            storeId: '1259',
            articleId: '732440',
            unitOfMeasure: 'EA',
            rawUnitOfMeasure: 'EA',
            availablePostPick: -3428,
          }),
      };

      jest.spyOn(pickingService, 'getNextTrip').mockImplementation(() => {
        return expectedResult;
      });

      jest.spyOn(inventoryService, 'getStockOnHand').mockImplementation(() => mockedInventoryResponse.toPromise());

      const result = await getNextTripResolver.getNextTrip(userName, branchNo, 'normal');
      expect(result).toMatchObject(expectedResult);

      //expect(toteItemsResult.every).toHaveProperty('articleId');
      //expect(toteItemsResult).toHaveProperty('orderNo');
    });
  });
});
