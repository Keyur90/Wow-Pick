import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateStatus } from '@rf2/picking/data/api-contracts';
import { CacheService } from '../dataSources';

@Resolver('CacheResolver')
export class CacheResolver {
  constructor(private readonly cacheService: CacheService) {}

  @Mutation()
  async resetCacheItem(@Args('userName') userName: string, @Args('branchNo') branchNo: string): Promise<UpdateStatus> {
    const cacheKey = `tripDetails-userName${userName}-branchNo${branchNo}`;
    await this.cacheService.get(cacheKey);
    return { success: true };
  }

  @Mutation()
  async resetAll(): Promise<UpdateStatus> {
    await this.cacheService.resetAll();
    return { success: true };
  }
}
