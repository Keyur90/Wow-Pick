import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Article } from '@rf2/picking/data/api-contracts';
import { mapStockOnHand } from '../mappings';
import { ArticleService, InventoryService } from './../dataSources';

@Resolver('Collectible')
export class CollectibleResolver {
  constructor(private readonly articleService: ArticleService, private readonly inventoryService: InventoryService) {}

  @ResolveField()
  async article(@Parent() collectible, @Info() info): Promise<Article> {
    const article = await this.articleService.getArticle(collectible, info.variableValues.branchNo);
    return article;
  }

  @ResolveField()
  async stockOnHand(@Parent() collectible, @Info() info): Promise<number> {
    const stockOnHand = await this.inventoryService.getStockOnHand(collectible.articleId, info.variableValues.branchNo);

    return mapStockOnHand(stockOnHand);
  }
}
