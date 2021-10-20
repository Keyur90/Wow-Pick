import { PEBConfig, ToteItem } from '@rf2/picking/data/api-contracts';
import { isBefore } from 'date-fns';
import { round as _round } from 'lodash';
import { ArticleType, quantityValidationErrors } from '../lib/constants';
import { hasAlreadySupplied } from '../lib/hasAlreadySuppliedQuantity';
import { isScannedBarcodeMatchWithArticleBarcode } from '../lib/isScannedBarcodeMatchWithArticleBarcode';
import { isWeightedQuantityArticle } from '../lib/isWeightedQuantityArticle';
import { convertKgToGrams } from '../lib/units';
import { validateExpiryDate } from '../lib/validateExpiryDate';
import { validateWeightTolerance } from '../lib/validateWeightTolerance';
import { BarcodeData } from '../types/barcode-data';
import { BarcodeType } from '../types/barcode-type';
import { BarcodeValidationResponse } from '../types/BarcodeValidationResponse';
import { ExpiryDateStatus } from '../types/expiry-date-status';
import { validateDatabarBarcode } from './DataBarValidator';
import { parseAndValidatePEBBarcode } from './PEBBarcodeParser';

export const validateBarcode = (
  barcode: string,
  currentToteItem: ToteItem,
  enableDataBarScan: boolean,
  enableShelfLifeValidation: boolean,
  defaultShelfLife: number,
  deliveryDate: string,
  pebConfig: PEBConfig[],
  today = new Date()
): BarcodeValidationResponse => {
  let scanItem: BarcodeData;
  scanItem = null;
  const article = currentToteItem.article;
  const isWeighted = isWeightedQuantityArticle(currentToteItem);
  const isKgArticle = currentToteItem?.article?.pricingUnit === ArticleType.KG;

  const barcodeValidationResponse: BarcodeValidationResponse = {
    isBarcodeMatchFound: false,
    barcodeType: null,
    barcodeData: null,
    expiryDateStatus: null,
    weightValidationStatus: null,
  };

  if (
    hasAlreadySupplied(
      currentToteItem.totalSuppliedQuantity,
      currentToteItem.orderedQuantity,
      isKgArticle,
      currentToteItem.article.weightPrimaryTolerance
    )
  ) {
    barcodeValidationResponse.showArticleMaximumQuantitySupplied = true;
    return barcodeValidationResponse;
  }

  //PEBValidation
  //scanItem = validator
  if (barcode?.length >= 16 && enableDataBarScan) {
    scanItem = validateDatabarBarcode(barcode);
  } else {
    //If barcode length is greater >= 16 then its a databar but enableDataBarScan is disabled, then treat the barcode as EAN
    if (barcode?.length < 16) {
      scanItem = parseAndValidatePEBBarcode(barcode, pebConfig);
    }
    // if its null, then its neither databar nor PEB, should be treated as EAN
    if (scanItem === null) {
      scanItem = {
        isValidBarcode: true,
        barcodeType: BarcodeType.EAN,
        calculatedBarcode: barcode,
        weight: null,
      };
    }
  }

  if (!scanItem.isValidBarcode) {
    return {
      isBarcodeMatchFound: false,
      barcodeType: scanItem.barcodeType,
    };
  }

  barcodeValidationResponse.barcodeType = scanItem.barcodeType;
  barcodeValidationResponse.barcodeData = scanItem;

  scanItem.weightInGrams = scanItem.weight != null ? convertKgToGrams(scanItem.weight) : null;

  const result = isScannedBarcodeMatchWithArticleBarcode(scanItem.calculatedBarcode, article);

  barcodeValidationResponse.isBarcodeMatchFound = result.matchFound;
  barcodeValidationResponse.isPrimary = result.isPrimary;

  if (barcodeValidationResponse.isBarcodeMatchFound) {
    if (barcodeValidationResponse.barcodeType === BarcodeType.EAN) {
      if (isWeighted) {
        barcodeValidationResponse.showWscanPopUp = true;
      }
      return barcodeValidationResponse;
    } else if (scanItem?.barcodeType === BarcodeType.GS1) {
      barcodeValidationResponse.promptExpiryDatePopup =
        !scanItem.expiryDate && !scanItem.skipExpiryDateValidation ? true : false;
      barcodeValidationResponse.showWscanPopUp = isWeighted && !scanItem.weightInGrams ? true : false;

      if (!scanItem.skipExpiryDateValidation && !barcodeValidationResponse.promptExpiryDatePopup) {
        if (enableShelfLifeValidation) {
          //Do Expiry date validations
          barcodeValidationResponse.expiryDateStatus = validateExpiryDate(
            currentToteItem.article.preferredShelfLife,
            currentToteItem.article.minShelfLife,
            deliveryDate,
            defaultShelfLife,
            scanItem.expiryDate,
            today
          );
        } else {
          if (scanItem.expiryDate && isBefore(scanItem.expiryDate, today)) {
            barcodeValidationResponse.expiryDateStatus = ExpiryDateStatus.ExpiryDateBeforeToday;
          } else {
            barcodeValidationResponse.expiryDateStatus = ExpiryDateStatus.IsValid;
          }
        }
      } else {
        barcodeValidationResponse.expiryDateStatus = ExpiryDateStatus.IsValid;
      }

      if (isWeighted && !barcodeValidationResponse.showWscanPopUp) {
        if (scanItem.weightInGrams <= 0) {
          barcodeValidationResponse.weightValidationStatus = quantityValidationErrors.WEIGHT_BELOW_LIMIT;
          return barcodeValidationResponse;
        }

        barcodeValidationResponse.weightValidationStatus = validateWeightTolerance(
          convertKgToGrams(scanItem.weight),
          currentToteItem
        );

        if (barcodeValidationResponse.weightValidationStatus !== null) {
          return barcodeValidationResponse;
        }
      }

      return barcodeValidationResponse;
    } else if (scanItem?.barcodeType === BarcodeType.PEB) {
      if (!article.useWeightRange && article.pricingUnit === ArticleType.EACH && article.eachMultiplier <= 0) {
        if (article.unitPrice > 0 && scanItem.suppliedPrice >= article.unitPrice) {
          scanItem.retrievedQty = Math.floor(_round(scanItem.suppliedPrice / article.unitPrice, 3));
          barcodeValidationResponse.showWscanPopUp = true;
        } else barcodeValidationResponse.isBarcodeMatchFound = false;
      } else {
        barcodeValidationResponse.showWscanPopUp = true;
        //barcodeValidationResponse.barcodeData = scanItem;
      }
    }
  }

  return barcodeValidationResponse;
};
