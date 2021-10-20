import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ElapsedTimeInput, UpdateStatus } from '@rf2/picking/data/api-contracts';

@Resolver('UpdateElapsedTime')
export class UpdateElapsedTimeResolver {
  @Mutation()
  async updateElapsedTime(@Args('elapsedTimeInput') elapsedTimeInput: ElapsedTimeInput): Promise<UpdateStatus> {
    return { success: true };
  }
}
