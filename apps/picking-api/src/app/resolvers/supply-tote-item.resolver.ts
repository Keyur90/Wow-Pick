import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SuppliedToteItemInput, UpdateStatus } from '@rf2/picking/data/api-contracts';
import { PickingService } from '../dataSources';

@Resolver('SupplyToteItem')
export class SupplyToteItemResolver {
  constructor(private readonly pickingService: PickingService) {}

  @Mutation()
  async supplyToteItem(
    @Args('suppliedToteItemInput') suppliedToteItemInput: SuppliedToteItemInput[]
  ): Promise<UpdateStatus[]> {
    return await this.pickingService.supplyToteItem(suppliedToteItemInput);
  }
}
