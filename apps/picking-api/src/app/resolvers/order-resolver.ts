import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('Order')
export class OrderResolver {
  @ResolveField()
  orderPrice(@Parent() Order): number {
    return 199.99;
  }
}
