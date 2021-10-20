import { ToteItem } from '@rf2/picking/data/api-contracts';
import { ArticleType } from '@rf2/shared/utility';

export const isWeightedQuantityArticle = (toteItem: ToteItem): boolean =>
  toteItem.article.pricingUnit === ArticleType.KG || toteItem.article.useWeightRange;
