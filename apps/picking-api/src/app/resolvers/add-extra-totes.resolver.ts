import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddExtraTotes, AddExtraTotesInput } from '@rf2/picking/data/api-contracts';
import { PickingService } from '../dataSources';

@Resolver('AddExtraTotes')
export class AddExtraTotesResolver {
  constructor(private readonly pickingService: PickingService) {}

  @Mutation()
  async addExtraTotes(@Args('addExtraTotesInput') addExtraTotesInput: AddExtraTotesInput): Promise<AddExtraTotes> {
    return await this.pickingService.printExtraToteLabels(addExtraTotesInput);
  }
}
