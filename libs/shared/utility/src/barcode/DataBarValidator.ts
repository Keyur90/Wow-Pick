import { BarcodeType } from '../types/barcode-type';
import { BarcodeData } from '../types/barcode-data';
import { DatabarAIs } from '../types/databar-ais';
import { parseBarcode } from './GS1BarcodeParser';

export const validateDatabarBarcode = (scannedBarcode: string): BarcodeData => {
  if (scannedBarcode.length < 16) {
    return null;
  }
  let parsedBarcode = null;
  try {
    parsedBarcode = parseBarcode(scannedBarcode);
  } catch (error) {
    return {
      isValidBarcode: false,
      barcodeType: BarcodeType.GS1,
      weight: null,
    };
  }

  return createScannedItemFromDatabarBarcode(parsedBarcode, scannedBarcode);
};

const createScannedItemFromDatabarBarcode = (parsedDatabar, data): BarcodeData => {
  const scanItem: BarcodeData = { isValidBarcode: false };

  // Validate the Parsed output is complete
  if (isValidDataBarBarcode(parsedDatabar)) {
    parsedDatabar.parsedCodeItems.forEach(function (item) {
      switch (item.ai) {
        case DatabarAIs.GTIN:
          scanItem.calculatedBarcode = item.data;
          scanItem.retrievedBarcode = encodeURI(data);
          scanItem.barcodeType = BarcodeType.GS1;
          break;
        case DatabarAIs.USEBY:
          scanItem.expiryDate = item.data;
          break;
        case DatabarAIs.BESTBY:
          if (parsedDatabar.parsedCodeItems.findIndex((x) => x.ai === DatabarAIs.USEBY) < 0) {
            scanItem.expiryDate = item.data;
          }
          break;

        case DatabarAIs.PACKEDON:
          if (
            parsedDatabar.parsedCodeItems.findIndex((x) => x.ai === DatabarAIs.USEBY) < 0 &&
            parsedDatabar.parsedCodeItems.findIndex((x) => x.ai === DatabarAIs.BESTBY) < 0
          ) {
            scanItem.skipExpiryDateValidation = true;
          }
          break;
        case DatabarAIs.BATCHNO:
          scanItem.batchNo = item.data;
          break;
        default:
          if (item.ai.startsWith(DatabarAIs.WEIGHT)) {
            scanItem.weight = parseFloat(item.data);
          }
          break;
      }
    });
    scanItem.isValidBarcode = true;
    scanItem.weight = scanItem.weight ?? null;
    return scanItem;
  }
  return scanItem;
};

const isValidDataBarBarcode = (parsedDatabar) => {
  const withDuplicatesRemoved = [...new Set(parsedDatabar.parsedCodeItems.map((i) => i.ai))];
  const indexOfGTIN = parsedDatabar.parsedCodeItems.findIndex(function (aiItem) {
    return aiItem.ai === DatabarAIs.GTIN;
  });
  return withDuplicatesRemoved.length === parsedDatabar.parsedCodeItems.length && indexOfGTIN > -1;
};
