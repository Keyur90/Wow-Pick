import { BarcodeValidationResponse } from '../types/BarcodeValidationResponse';
import { ArticleType } from '..';
import { Article } from '@rf2/picking/data/api-contracts';
import { BarcodeType } from '../types/barcode-type';

export const validateNormalBarcode = (scannedBarcode: string, article: Article): BarcodeValidationResponse => {
  const response = new BarcodeValidationResponse();

  if (article.barcodes.map((x) => x.barcode).includes(scannedBarcode)) {
    response.isBarcodeMatchFound = true;
    response.barcodeType = BarcodeType.EAN;
    if (article.pricingUnit === ArticleType.KG || article.useWeightRange) {
      response.showWscanPopUp = true;
    }
  }

  return response;
};
