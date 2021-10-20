import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Article } from '@rf2/picking/data/api-contracts';
import { mapStockOnHand } from '../mappings';
import { ArticleService, InventoryService } from './../dataSources';

@Resolver('ToteItem')
export class ToteItemResolver {
  constructor(private readonly articleService: ArticleService, private readonly inventoryService: InventoryService) {}

  @ResolveField()
  async article(@Parent() toteItem, @Info() info): Promise<Article> {
    const article = await this.articleService.getArticle(toteItem, info.variableValues.branchNo);
    return article;
  }

  @ResolveField()
  async stockOnHand(@Parent() toteItem, @Info() info): Promise<number> {
    const stockOnHand = await this.inventoryService.getStockOnHand(toteItem.articleId, info.variableValues.branchNo);

    return mapStockOnHand(stockOnHand);
  }
}
