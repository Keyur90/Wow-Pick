import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MoveToteItemInput, UpdateStatus } from '@rf2/picking/data/api-contracts';
import { CacheService, PickingService } from '../dataSources';

@Resolver('MoveToteItem')
export class MoveToteItemResolver {
  private readonly logger = new Logger(MoveToteItemResolver.name);

  constructor(private readonly pickingService: PickingService, private readonly cacheService: CacheService) {}
  @Mutation()
  async moveToteItem(@Args('moveToteItemInput') moveToteItemInput: MoveToteItemInput[]): Promise<UpdateStatus> {
    this.logger.log({ message: 'moveToteItem started', args: { moveToteItemInput } });

    return { success: true };
  }
}
