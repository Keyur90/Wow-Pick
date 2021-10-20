import { ArticleType, isPerishable } from '../util';

export const mapArticle = async (actualWeightTradingDepartments, toteItem, article, secondaryArticle) => {
  article.id = article.referenceNumber;
  article.description = `${article.brand} ${article.genericName} ${article.volumeSize}`;
  article.isPerishable = isPerishable(article.perishableCode);
  article.barcodes = article.eans.map((x) => {
    return { barcode: x.ean, barcodeType: x.eanType, isPrimary: true };
  });

  if (secondaryArticle) {
    const secondaryBarcodes = secondaryArticle.eans.map((x) => {
      return { barcode: x.ean, barcodeType: x.eanType, isPrimary: false };
    });

    article.barcodes = [...article.barcodes, ...secondaryBarcodes];
  }

  const itemSettings = await import(`../fixtures/articleSettings.json`);
  const defaultItemSettings = itemSettings.default.find((x) => x.articleId === '0');
  const item = itemSettings.default.find((x) => x.articleId === article.id);
  article = {
    ...article,
    ...(item ? item : defaultItemSettings),
  };

  if (!article.barcodes) {
    article.barcodes = defaultItemSettings.eans;
  }

  const articleDepartmentId = article.articleHierarchy?.find((x) => x.hierarchyLevel === 2)?.hierarchyNode;
  const articleBelongsToWeightDepartment = actualWeightTradingDepartments.includes(articleDepartmentId);

  //Coming from Typhoon at the time of order
  //Only send eachMultiplier for ActualWeightTradingDepartments

  article.volumeSize = toteItem.volumeSize;
  article.eachMultiplier = articleBelongsToWeightDepartment ? toteItem.eachMultiplier : 0;
  article.useWeightRange = toteItem.useWeightRange;
  article.minWeight = toteItem.minWeight;
  article.maxWeight = toteItem.maxWeight;
  article.pricingUnit = toteItem.pricingUnit?.toUpperCase();

  if (article.pricingUnit == ArticleType.EACH && article.eachMultiplier > 0 && !article.useWeightRange) {
    article.minWeight = article.eachMultiplier;
    article.maxWeight = article.eachMultiplier;
    article.useWeightRange = true;
  }

  const articleSettings = article.stores?.length > 1 ? article.stores[0].articleSettings : null;
  if (articleSettings) {
    article.weightPrimaryTolerance = articleSettings.priceEmbeddedBarcodeTolerancePercentage;
    article.weightSecondaryTolerance = articleSettings.secondaryPriceEmbeddedBarcodeTolerancePercentage;
    article.weightOverride = articleSettings.allowPriceEmbeddedBarcodeOverride;
    article.subDollarVariance = articleSettings.priceVariancePercentage;
    article.subPercentageVariance = articleSettings.priceVarianceAbsolute;
    article.subOverride = articleSettings.allowSubstitutionOverride;
    article.wontScanKg = articleSettings.allowManualEntryOfWeight;
    article.wontScanEach = articleSettings.allowManualEntryOfUnit;
  }

  return article;
};
