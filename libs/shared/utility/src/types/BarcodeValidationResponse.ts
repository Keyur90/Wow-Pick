import { BarcodeData } from '../types/barcode-data';
import { BarcodeType } from '../types/barcode-type';
import { ExpiryDateStatus } from '../types/expiry-date-status';

export class BarcodeValidationResponse {
  isBarcodeMatchFound: boolean;
  showWscanPopUp?: boolean;
  barcodeData?: BarcodeData;
  barcodeType: BarcodeType;
  promptExpiryDatePopup?: boolean;
  expiryDateStatus?: ExpiryDateStatus;
  weightValidationStatus?: string;
  showArticleMaximumQuantitySupplied?: boolean;
  isPrimary?: boolean;
}

export enum WeightToleranceErrors {
  ExceedingSecondaryWeightRange = 'ExceedingSecondaryWeightRange',
  ExceedingSecondaryEachWeightRange = 'ExceedingSecondaryEachWeightRange',
}
