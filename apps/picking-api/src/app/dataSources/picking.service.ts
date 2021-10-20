import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AddExtraTotes,
  AddExtraTotesInput,
  CollectLabel,
  DeliveryLabel,
  GetNextTrip,
  PrintCollectBagLabels,
  PrintDeliveryBagLabels,
  SuppliedCollectibleInput,
  SuppliedFreeSampleInput,
  SuppliedToteItemInput,
  TrolleyStatus,
  UpdateStatus,
  UpdateTrolleyStatusInput,
} from '@rf2/picking/data/api-contracts';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, of, throwError } from 'rxjs';
import { mapToteItem } from '../mappings';
import { PickingServiceMock } from './picking.service.mock';

const EXPRESS_TYPE = 'express';

@Injectable()
export class PickingService {
  private readonly logger = new Logger(PickingService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly mockApi: PickingServiceMock
  ) {}

  useMockApi(userName: string, branchNo: string): boolean {
    return this.configService.get<boolean>('enableMockedPickingApi') && this.mockApi.hasMockFor(userName, branchNo);
  }

  async getNextTrip(userName: string, branchNo: string, trolleyType: string): Promise<GetNextTrip> {
    this.logger.log({ message: 'getNextTrip started', args: { userName, branchNo, trolleyType } });

    let apiResponse: AxiosResponse<GetNextTrip> = null;
    if (this.useMockApi(userName, branchNo)) apiResponse = await this.mockApi.getNextTrip(userName, branchNo);
    else
      apiResponse = await firstValueFrom(
        this.httpService
          .post<GetNextTrip>(
            `${this.configService.get<string>('pickingServiceConfig.baseUrl')}trolleys/next/${trolleyType}`,
            {
              userCode: userName,
              branchNo: parseInt(branchNo),
            }
          )
          .pipe(
            catchError((error: AxiosError<GetNextTrip>) => {
              // If no trip found response (404) then return null as data to UI
              if (error.response?.status === 404)
                return of({ ...error.response, data: null, status: 200, statusText: 'OK' });

              // else rethrow
              return throwError(() => error);
            })
          )
      );

    let data = apiResponse.data;

    if (data) {
      data = apiResponse.data;

      data.isExpress = trolleyType === EXPRESS_TYPE ? true : false;
      data.trolleyType = trolleyType;
      data.toteItems = data.toteItems?.map((ti) => mapToteItem(ti, data.totes));

      //ToDo: Remove suppliedQuantity form UI and just rely on isSupplied
      data.freeSamples?.forEach((_) => {
        if (_.isSupplied !== undefined) _.suppliedQuantity = _.isSupplied ? 1 : 0;
      });
    }

    this.logger.log({ message: 'getNextTrip succeeded', args: { userName, branchNo, trolleyType } });
    return data;
  }

  async supplyToteItem(toteItems: SuppliedToteItemInput[] = []): Promise<UpdateStatus[]> {
    const { userName, branchNo } = toteItems[0]; // All tote items should belong to same user/branch

    let apiResponse: AxiosResponse<UpdateStatus[]> = null;

    if (this.useMockApi(userName, branchNo)) apiResponse = await this.mockApi.supplyToteItem(toteItems);
    else
      apiResponse = await firstValueFrom(
        this.httpService.post<UpdateStatus[]>(
          `${this.configService.get<string>('pickingServiceConfig.baseUrl')}toteitems/supply`,
          toteItems
        )
      );

    const data = apiResponse.data;
    return data;
  }

  async supplyFreeSamples(freeSamples: SuppliedFreeSampleInput[] = []): Promise<UpdateStatus[]> {
    const { userName, branchNo } = freeSamples[0]; // All tote items should belong to same user/branch

    let apiResponse: AxiosResponse<UpdateStatus[]> = null;
    if (this.useMockApi(userName, branchNo)) apiResponse = await this.mockApi.supplyFreeSamples(freeSamples);
    else
      apiResponse = await firstValueFrom(
        this.httpService.post<UpdateStatus[]>(
          `${this.configService.get<string>('pickingServiceConfig.baseUrl')}freesamples/supply`,
          freeSamples
        )
      );

    const data = apiResponse.data;
    return data;
  }

  async supplyCollectibles(collectibles: SuppliedCollectibleInput[] = []): Promise<UpdateStatus[]> {
    const { userName, branchNo } = collectibles[0]; // All tote items should belong to same user/branch

    let apiResponse: AxiosResponse<UpdateStatus[]> = null;
    if (this.useMockApi(userName, branchNo)) apiResponse = await this.mockApi.supplyCollectibles(collectibles);
    else
      apiResponse = await firstValueFrom(
        this.httpService.post<UpdateStatus[]>(
          `${this.configService.get<string>('pickingServiceConfig.baseUrl')}collectibles/supply`,
          collectibles
        )
      );

    const data = apiResponse.data;
    return data;
  }

  async printExtraToteLabels(printExtraToteLabelsInput: AddExtraTotesInput): Promise<AddExtraTotes> {
    const { userName, branchNo, trolleyId } = printExtraToteLabelsInput;

    let apiResponse: AxiosResponse<AddExtraTotes> = null;
    if (this.useMockApi(userName, branchNo))
      apiResponse = await this.mockApi.printExtraToteLabels(printExtraToteLabelsInput);
    else
      apiResponse = await firstValueFrom(
        this.httpService.post<AddExtraTotes>(
          `${this.configService.get<string>('pickingServiceConfig.baseUrl')}trolleys/${trolleyId}/totes/extra`,
          printExtraToteLabelsInput
        )
      );

    const data = apiResponse.data;
    return data;
  }

  async printExtraDeliveryBagLabels(printExtraLabelsInput): Promise<PrintDeliveryBagLabels> {
    const labels = [...Array(printExtraLabelsInput.labelCount).keys()].map((index) => {
      return {
        id: (index + 7).toString(),
        orderNo: printExtraLabelsInput.orderNo,
        position: index + 7,
        pickingZoneId: printExtraLabelsInput.pickingZoneId,
        pickingZoneName: printExtraLabelsInput.pickingZoneName,
        barcode: printExtraLabelsInput.barcode,
      };
    });

    return { labels: labels as DeliveryLabel[] };
  }

  async printExtraCollectBagLabels(printExtraLabelsInput): Promise<PrintCollectBagLabels> {
    const labels = [...Array(printExtraLabelsInput.labelCount).keys()].map((index) => {
      return {
        id: (index + 7).toString(),
        orderNo: printExtraLabelsInput.orderNo,
        position: index + 7,
        pickingZoneId: 1,
        barcode: printExtraLabelsInput.barcode,
      };
    });

    return { labels: labels as CollectLabel[] };
  }

  async updateTrolleyStatus(updateTrolleyStatusInput: UpdateTrolleyStatusInput): Promise<UpdateStatus> {
    let apiResponse: AxiosResponse<UpdateStatus> = null;
    if (this.useMockApi(updateTrolleyStatusInput.userName, updateTrolleyStatusInput.branchNo))
      apiResponse = await this.mockApi.updateTrolleyStatus(updateTrolleyStatusInput);
    else
      apiResponse = await firstValueFrom(
        this.httpService.post<UpdateStatus>(
          `${this.configService.get<string>('pickingServiceConfig.baseUrl')}trolleys/${updateTrolleyStatusInput.id}/${
            updateTrolleyStatusInput.trolleyStatus === TrolleyStatus.PACK ? 'pack' : 'complete'
          }`,
          updateTrolleyStatusInput
        )
      );

    const data = apiResponse.data;
    return data;
  }
}
