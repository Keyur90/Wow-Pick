import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PEBConfig, PrintersPoolList, PrintToteLabels } from '@rf2/picking/data/api-contracts';
import camelcaseKeys from 'camelcase-keys';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LegacyApiService {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  async getPEBConfigs(allConfigs: string): Promise<PEBConfig> {
    const legacyApiBaseUrl = this.configService.get<string>('legacyApiServiceConfig.baseurl');
    const payload = await this.httpService
      .get(`${legacyApiBaseUrl}/trolleypicking//GetPEBConfigs/dummy/0000/${allConfigs}`)
      .toPromise();

    const response = camelcaseKeys(payload.data.Data, {
      deep: true,
    });
    return response;
  }

  async getPrintersPoolList(branchNo: string): Promise<PrintersPoolList> {
    const legacyApiBaseUrl = this.configService.get<string>('legacyApiServiceConfig.baseurl');

    const response = await firstValueFrom(
      this.httpService.get(`${legacyApiBaseUrl}/trolleypicking/GetPrintersPoolList/${branchNo}`)
    );

    return {
      printerPools: response.data?.Data.map((printerPool) => {
        return {
          id: printerPool.UniqueId,
          name: printerPool.Name,
        };
      }),
    };
  }

  async printToteLabels(printToteLabelsInput): Promise<PrintToteLabels> {
    // const legacyApiBaseUrl = this.configService.get<string>('legacyApiServiceConfig.baseurl');
    // const { userName, branchNo, printerPoolId } = printToteLabelsInput;

    // const response = await this.httpService
    //   .get(`${legacyApiBaseUrl}/trolleypicking/PrintTrolleyLabels/${userName}/null/${branchNo}/${printerPoolId}`)
    //   .toPromise();

    const response = await import(`../fixtures/printToteLabels.json`);

    return {
      labels: response.data?.Data?.length
        ? response.data.Data.map(
            ({ LabelId, OrderNo, TrayPosition, DeliveryMethod, PickingZoneId, Barcode, IsNoBags, IsFlatFee }) => {
              return {
                id: LabelId.toString(),
                orderNo: OrderNo.toString(),
                position: TrayPosition,
                deliveryMethod: DeliveryMethod,
                pickingZoneId: PickingZoneId,
                barcode: Barcode,
                isNoBags: IsNoBags,
                isFlatFee: IsFlatFee,
              };
            }
          )
        : null,
      error: (response.data.ErrorMessage as string) ?? null,
    };
  }
}
