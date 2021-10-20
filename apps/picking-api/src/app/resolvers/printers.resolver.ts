import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrintersPoolList } from '@rf2/picking/data/api-contracts';
import { LegacyApiService } from '../dataSources';

@Resolver('Printers')
export class PrintersResolver {
  constructor(private readonly legacyApiService: LegacyApiService) {}

  @Query()
  async getPrintersPoolList(@Args('branchNo') branchNo: string): Promise<PrintersPoolList> {
    return await this.legacyApiService.getPrintersPoolList(branchNo);
  }
}
