import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AddExtraTotes,
  AddExtraTotesInput,
  GetNextTrip,
  SuppliedCollectibleInput,
  SuppliedFreeSampleInput,
  SuppliedToteItemInput,
  Tote,
  TrolleyStatus,
  UpdateStatus,
  UpdateTrolleyStatusInput,
} from '@rf2/picking/data/api-contracts';
import { AxiosResponse } from 'axios';
import { CacheService } from './cache.service';

const MOCKED_NORMAL_TRIPS_CONFIG_KEY = 'mockedNormalApiTrips';

@Injectable()
export class PickingServiceMock {
  constructor(private readonly configService: ConfigService, private readonly cacheService: CacheService) {}

  hasMockFor(userName: string, branchNo: string): boolean {
    return !!this.configService
      .get<string[]>(MOCKED_NORMAL_TRIPS_CONFIG_KEY)
      ?.includes(this.getTripCacheKey(userName, branchNo));
  }

  async getNextTrip(userName: string, branchNo: string): Promise<AxiosResponse<GetNextTrip>> {
    const cacheKey = this.getTripCacheKey(userName, branchNo);
    const cachedTrip = await this.cacheService.get<GetNextTrip>(cacheKey);

    return { data: cachedTrip, status: 200, statusText: 'OK', headers: [], config: {} };
  }

  async supplyToteItem(toteItems: SuppliedToteItemInput[] = []): Promise<AxiosResponse<UpdateStatus[]>> {
    const { userName, branchNo } = toteItems[0];

    const cacheKey = this.getTripCacheKey(userName, branchNo);
    const cachedTrip = await this.cacheService.get<GetNextTrip>(this.getTripCacheKey(userName, branchNo));

    const data: UpdateStatus[] = [];

    toteItems.forEach((toteItem) => {
      const cachedToteItem = cachedTrip.toteItems.find((_) => _.id === toteItem.id);
      if (!cachedToteItem) return;

      cachedToteItem.lastUpdatedUtcTimeTicks = new Date().toISOString();
      cachedToteItem.suppliedDetails = toteItem.suppliedDetails;

      data.push(mapToSuccessUpdateStatus(cachedToteItem.id, cachedToteItem.lastUpdatedUtcTimeTicks));
    });

    await this.cacheService.set(cacheKey, cachedTrip);

    return { data, status: 200, statusText: 'OK', headers: [], config: {} };
  }

  async supplyCollectibles(collectibles: SuppliedCollectibleInput[] = []): Promise<AxiosResponse<UpdateStatus[]>> {
    const { userName, branchNo } = collectibles[0];

    const cacheKey = this.getTripCacheKey(userName, branchNo);
    const cachedTrip = await this.cacheService.get<GetNextTrip>(this.getTripCacheKey(userName, branchNo));

    const data: UpdateStatus[] = [];

    collectibles.forEach((collectible) => {
      const cachedCollectible = cachedTrip.collectibles.find((_) => _.id === collectible.id);
      if (!cachedCollectible) return;

      cachedCollectible.lastUpdatedUtcTimeTicks = new Date().toISOString();
      cachedCollectible.suppliedQuantity = collectible.suppliedQuantity;

      data.push(mapToSuccessUpdateStatus(cachedCollectible.id, cachedCollectible.lastUpdatedUtcTimeTicks));
    });

    await this.cacheService.set(cacheKey, cachedTrip);

    return { data, status: 200, statusText: 'OK', headers: [], config: {} };
  }

  async supplyFreeSamples(freeSamples: SuppliedFreeSampleInput[] = []): Promise<AxiosResponse<UpdateStatus[]>> {
    const { userName, branchNo } = freeSamples[0];

    const cacheKey = this.getTripCacheKey(userName, branchNo);
    const cachedTrip = await this.cacheService.get<GetNextTrip>(this.getTripCacheKey(userName, branchNo));

    const data: UpdateStatus[] = [];

    freeSamples.forEach((freeSample) => {
      const cachedFreeSample = cachedTrip.freeSamples.find((_) => _.id === freeSample.id);
      if (!cachedFreeSample) return;

      cachedFreeSample.lastUpdatedUtcTimeTicks = new Date().toISOString();
      cachedFreeSample.isSupplied = freeSample.isSupplied;
      //ToDo: Remove suppliedQuantity form UI and just rely on isSupplied
      cachedFreeSample.suppliedQuantity = freeSample.isSupplied ? 1 : 0;

      data.push(mapToSuccessUpdateStatus(cachedFreeSample.id, cachedFreeSample.lastUpdatedUtcTimeTicks));
    });

    await this.cacheService.set(cacheKey, cachedTrip);

    return { data, status: 200, statusText: 'OK', headers: [], config: {} };
  }

  async printExtraToteLabels(printExtraToteLabelsInput: AddExtraTotesInput): Promise<AxiosResponse<AddExtraTotes>> {
    const additionalTotes = [...Array(printExtraToteLabelsInput.count).keys()].map((index) => {
      return {
        id: (index + 7).toString(),
        orderNo: printExtraToteLabelsInput.orderNo,
        position: index + 7,
        pickingZoneId: printExtraToteLabelsInput.pickingZoneId,
        pickingZoneName: printExtraToteLabelsInput.pickingZoneName,
        barcode: `${printExtraToteLabelsInput.orderNo}${(index + 7).toString()}`,
      };
    });
    return {
      status: 200,
      statusText: 'OK',
      headers: [],
      config: {},
      data: { success: true, error: null, totes: additionalTotes as Tote[] },
    };
  }

  private getTripCacheKey(userName: string, branchNo: string): string {
    return `tripDetails-userName${userName}-branchNo${branchNo}`;
  }

  async updateTrolleyStatus(updateTrolleyStatusInput: UpdateTrolleyStatusInput): Promise<AxiosResponse<UpdateStatus>> {
    const cacheKey = this.getTripCacheKey(updateTrolleyStatusInput.userName, updateTrolleyStatusInput.branchNo);
    const cachedTrip = await this.cacheService.get<GetNextTrip>(
      this.getTripCacheKey(updateTrolleyStatusInput.userName, updateTrolleyStatusInput.branchNo)
    );

    cachedTrip.lastUpdatedUtcTimeTicks = new Date().toISOString();
    cachedTrip.pickingDone = updateTrolleyStatusInput.trolleyStatus === TrolleyStatus.PACK ? true : false;

    await this.cacheService.set(cacheKey, cachedTrip);
    const data: UpdateStatus = {
      success: true,
      error: null,
      id: cachedTrip.id,
      lastUpdatedUtcTimeTicks: cachedTrip.lastUpdatedUtcTimeTicks,
    };
    return { data, status: 200, statusText: 'OK', headers: [], config: {} };
  }
}

const mapToSuccessUpdateStatus = (id: string, lastUpdatedUtcTimeTicks: string): UpdateStatus => {
  return { success: true, error: null, id, lastUpdatedUtcTimeTicks };
};
