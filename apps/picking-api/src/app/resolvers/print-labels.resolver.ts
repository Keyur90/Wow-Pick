import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  PrintCollectBagLabels,
  PrintCollectBagLabelsInput,
  PrintDeliveryBagLabels,
  PrintDeliveryBagLabelsInput,
  PrintToteLabels,
  PrintToteLabelsInput,
} from '@rf2/picking/data/api-contracts';
import { LegacyApiService, PickingService } from '../dataSources';

@Resolver('PrintLabels')
export class PrintLabelsResolver {
  constructor(private readonly pickingService: PickingService, private readonly legacyApiService: LegacyApiService) {}

  @Mutation()
  async printToteLabels(
    @Args('printToteLabelsInput') printToteLabelsInput: PrintToteLabelsInput
  ): Promise<PrintToteLabels> {
    return await this.legacyApiService.printToteLabels(printToteLabelsInput);
  }

  @Mutation()
  async printDeliveryBagLabels(
    @Args('printDeliveryBagLabelsInput') printDeliveryBagLabelsInput: PrintDeliveryBagLabelsInput
  ): Promise<PrintDeliveryBagLabels> {
    return await this.pickingService.printExtraDeliveryBagLabels(printDeliveryBagLabelsInput);
  }

  @Mutation()
  async printCollectBagLabels(
    @Args('printCollectBagLabelsInput') printCollectBagLabelsInput: PrintCollectBagLabelsInput
  ): Promise<PrintCollectBagLabels> {
    return await this.pickingService.printExtraCollectBagLabels(printCollectBagLabelsInput);
  }
}
