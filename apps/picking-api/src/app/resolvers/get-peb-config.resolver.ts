import { Args, Query, Resolver } from '@nestjs/graphql';
import { PEBConfig } from '@rf2/picking/data/api-contracts';
import { LegacyApiService } from '../dataSources/legacyApi.service';

@Resolver('PEBConfigs')
export class GetPEBConfigsResolver {
  constructor(private readonly legacyApiService: LegacyApiService) {}

  @Query()
  async getPEBConfigs(@Args('allConfigs') allConfigs: string): Promise<PEBConfig> {
    const response = await this.legacyApiService.getPEBConfigs(allConfigs);
    return response;
  }
}
