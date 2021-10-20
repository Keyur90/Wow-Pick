import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GetNextTrip } from '@rf2/picking/data/api-contracts';
import { PickingService } from './../dataSources';

@Resolver('GetNextTrip')
export class GetNextTripResolver {
  constructor(private readonly pickingService: PickingService) {}

  @Query()
  async getNextTrip(
    @Args('userName') userName: string,
    @Args('branchNo') branchNo: string,
    @Args('trolleyType') trolleyType: string
  ): Promise<GetNextTrip> {
    const response = await this.pickingService.getNextTrip(userName, branchNo, trolleyType);
    return response;
  }

  @ResolveField()
  bonusTime(@Parent() getNextTrip): number {
    return 10;
  }

  @ResolveField()
  isNewTrolley(@Parent() getNextTrip): number {
    return getNextTrip.isNewTrolley !== undefined ? getNextTrip.isNewTrolley : true;
  }
}
