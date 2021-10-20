import { BarcodeType } from './barcode-type';

export interface BarcodeData {
  isValidBarcode: boolean;
  calculatedBarcode?: string;
  retrievedBarcode?: string;
  barcodeType?: BarcodeType;
  weight?: number;
  expiryDate?: Date;
  skipExpiryDateValidation?: boolean;
  batchNo?: string;
  weightInGrams?: number;
  retrievePrice?: number;
  suppliedPrice?: number;
  retrievedQty?: number;
  retrievedItem?: number;
}
