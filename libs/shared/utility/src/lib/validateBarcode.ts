import { PEBConfig, ToteItem } from '@rf2/picking/data/api-contracts';
import { useEffect, useState } from 'react';
import { BarcodeValidationResponse } from '../types/BarcodeValidationResponse';
import { validateBarcode } from '../barcode/parseScannedBarcode';

export const useBarcodeValidator = (
  scannedBarcode: string,
  currentToteItem: ToteItem,
  enableDataBarScan: boolean,
  enableShelfLifeValidation: boolean,
  defaultShelfLife: number,
  deliveryDate: string,
  pebConfig: [PEBConfig]
): BarcodeValidationResponse => {
  const [response, setResponse] = useState<BarcodeValidationResponse>();

  useEffect(() => {
    if (!scannedBarcode || !currentToteItem.article?.barcodes) {
      setResponse(null);
      return;
    }
    setResponse(
      validateBarcode(
        scannedBarcode,
        currentToteItem,
        enableDataBarScan,
        enableShelfLifeValidation,
        defaultShelfLife,
        deliveryDate,
        pebConfig
      )
    );
  }, [scannedBarcode, currentToteItem, enableDataBarScan, enableShelfLifeValidation, defaultShelfLife, deliveryDate]);

  return response;
};
