import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SuppliedCollectibleInput, UpdateStatus } from '@rf2/picking/data/api-contracts';
import { PickingService } from '../dataSources';

@Resolver('SupplyCollectibles')
export class SupplyCollectiblesResolver {
  constructor(private readonly pickingService: PickingService) {}

  @Mutation()
  async supplyCollectibles(
    @Args('suppliedCollectibleInput') suppliedCollectibleInput: SuppliedCollectibleInput[]
  ): Promise<UpdateStatus[]> {
    return await this.pickingService.supplyCollectibles(suppliedCollectibleInput);
  }
}
