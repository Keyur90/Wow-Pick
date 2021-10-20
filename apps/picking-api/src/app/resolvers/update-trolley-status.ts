import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateStatus, UpdateTrolleyStatusInput } from '@rf2/picking/data/api-contracts';
import { PickingService } from '../dataSources';

@Resolver('UpdateTrolleyStatus')
export class UpdateTrolleyStatusResolver {
  constructor(private readonly pickingService: PickingService) {}

  @Mutation()
  async updateTrolleyStatus(
    @Args('updateTrolleyStatusInput') updateTrolleyStatusInput: UpdateTrolleyStatusInput
  ): Promise<UpdateStatus> {
    return await this.pickingService.updateTrolleyStatus(updateTrolleyStatusInput);
  }
}
