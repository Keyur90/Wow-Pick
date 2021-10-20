import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderDispatchResponse, OrderDispatchStatus } from '@rf2/picking/data/api-contracts';

@Resolver('DispatchOrder')
export class DispatchOrderResolver {
  @Mutation()
  async dispatchOrder(@Args('orderNo') orderNo: string): Promise<OrderDispatchResponse> {
    if (orderNo.startsWith('1')) {
      return { success: false, status: OrderDispatchStatus.ORDERALREADYDISPATCHED };
    } else if (orderNo.startsWith('2')) {
      return { success: false, status: OrderDispatchStatus.ORDERCANCELLED };
    } else if (orderNo.startsWith('3')) {
      return { success: false, status: OrderDispatchStatus.ORDERNOTFOUND };
    } else {
      return { success: true };
    }
  }
}
