import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SuppliedFreeSampleInput, UpdateStatus } from '@rf2/picking/data/api-contracts';
import { PickingService } from '../dataSources';

@Resolver('SupplyFreeSamples')
export class SupplyFreeSamplesResolver {
  constructor(private readonly pickingService: PickingService) {}

  @Mutation()
  async supplyFreeSamples(
    @Args('suppliedFreeSampleInput') suppliedCollectibleInput: SuppliedFreeSampleInput[]
  ): Promise<UpdateStatus[]> {
    return await this.pickingService.supplyFreeSamples(suppliedCollectibleInput);
  }
}
