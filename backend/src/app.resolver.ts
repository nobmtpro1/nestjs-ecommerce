import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async getAuthor(@Args('id', { type: () => String }) id: string) {
    return id;
  }
}
