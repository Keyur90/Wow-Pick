import { ScanDetail, SuppliedDetail, ToteItem } from '@rf2/picking/data/api-contracts';
import { ArticleType, BarcodeData } from '@rf2/shared/utility';
import { cloneDeep as _cloneDeep } from 'lodash';
import { SupplyTypes } from './constants';

export const updateSuppliedQuantities = (
  toteItem: ToteItem,
  quantity: number,
  barcodeData?: BarcodeData,
  supplyType?: SupplyTypes
) => {
  const suppliedDetails: SuppliedDetail[] = _cloneDeep(toteItem.suppliedDetails);
  const index = suppliedDetails.findIndex((x) => x.type === supplyType);

  if (!suppliedDetails.length || index === -1) {
    suppliedDetails.push({
      type: supplyType,
      articleId: supplyType === SupplyTypes.PRIMARY ? toteItem.articleId : toteItem.secondaryArticleId,
      scanDetails: [createSupplyDetail(toteItem, quantity, barcodeData)],
    });
  } else if (index !== -1 && !toteItem.article.useWeightRange) {
    suppliedDetails[index].scanDetails.push(createSupplyDetail(toteItem, quantity, barcodeData));
  }

  return suppliedDetails;
};

const createSupplyDetail = (toteItem: ToteItem, quantity: number, barcodeData?: BarcodeData) => {
  const supplyDetail: ScanDetail = {
    barcode: barcodeData?.calculatedBarcode ?? '',
    storePrice: 0,
    suppliedPrice: barcodeData?.suppliedPrice ?? 0,
    batchNo: barcodeData?.batchNo ?? '',
    dataBar: barcodeData?.retrievedBarcode ?? '',
    expiryDate: barcodeData?.expiryDate != null ? barcodeData?.expiryDate.toISOString() : null,
  };

  if (toteItem.article.pricingUnit === ArticleType.EACH) {
    supplyDetail.quantity = toteItem.article.useWeightRange ? 1 : quantity;
    supplyDetail.weight = toteItem.article.useWeightRange ? quantity : null;
  } else {
    supplyDetail.quantity = 0;
    supplyDetail.weight = quantity;
  }

  return supplyDetail;
};
