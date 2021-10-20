import { BarcodeData } from '../types/barcode-data';
import { BarcodeType } from '../types/barcode-type';

// const PEBConfigs = [
//   {
//     id: 1,
//     description: 'Prefix 02',
//     prefixStart: '02',
//     prefixEnd: null,
//     barcodeLength: 13,
//     priceOffset: 8,
//     priceLength: 5,
//     priceDecimals: 2,
//     qtyOffset: 0,
//     qtyLength: 0,
//     qtyDecimals: 0,
//     itemLength: 0,
//     itemOffset: 0,
//     checkDigitOffset: 13,
//   },
//   {
//     Id: 2,
//     description: 'Prefix Range 20-29',
//     prefixStart: '20',
//     prefixEnd: '29',
//     barcodeLength: 13,
//     priceOffset: 8,
//     priceLength: 5,
//     priceDecimals: 2,
//     qtyOffset: 0,
//     qtyLength: 0,
//     qtyDecimals: 0,
//     itemLength: 0,
//     itemOffset: 0,
//     checkDigitOffset: 13,
//   },
//   {
//     id: 3,
//     description: 'Prefix Range 20-29 len_12',
//     prefixStart: '20',
//     prefixEnd: '29',
//     barcodeLength: 12,
//     priceOffset: 7,
//     priceLength: 5,
//     priceDecimals: 2,
//     qtyOffset: 0,
//     qtyLength: 0,
//     qtyDecimals: 0,
//     itemLength: 0,
//     itemOffset: 0,
//     checkDigitOffset: 12,
//   },
//   {
//     id: 4,
//     description: 'ShelveEdge Labels for article barcodes',
//     prefixStart: '950',
//     prefixEnd: null,
//     barcodeLength: 16,
//     priceOffset: 0,
//     priceLength: 0,
//     priceDecimals: 0,
//     qtyOffset: 0,
//     qtyLength: 0,
//     qtyDecimals: 0,
//     itemLength: 6,
//     itemOffset: 4,
//     checkDigitOffset: -1,
//   },
//   {
//     id: 5,
//     description: 'ShelveEdgeLabels for article barcodes',
//     prefixStart: '960',
//     prefixEnd: null,
//     barcodeLength: 16,
//     priceOffset: 0,
//     priceLength: 0,
//     priceDecimals: 0,
//     qtyOffset: 0,
//     qtyLength: 0,
//     qtyDecimals: 0,
//     itemLength: 10,
//     itemOffset: 4,
//     checkDigitOffset: -1,
//   },
// ];

const g_zeroDigitOffset = 7;

export const parseAndValidatePEBBarcode = (scannedBarcode, PEBConfigs) => {
  let scannedItem: BarcodeData;
  scannedItem = null;
  let i = -1;
  let found = false;

  while (i < PEBConfigs.length - 1 && !found) {
    i++;
    const _pebConfig = PEBConfigs[i];

    //first check for valid object and length
    if (_pebConfig === null || _pebConfig.barcodeLength !== scannedBarcode.length) {
      continue;
    }
    //assuming we only have a prefixStart AND prefixEnd = 0
    if (_pebConfig?.prefixStart !== null && _pebConfig?.prefixEnd === null) {
      if (_pebConfig.prefixStart !== scannedBarcode.slice(0, _pebConfig.prefixStart.toString().length)) continue;
      //assuming we have both prefixStart AND prefixEnd - check range
    } else if (_pebConfig?.prefixStart !== null && _pebConfig?.prefixEnd !== null) {
      const extract = parseInt(scannedBarcode.slice(0, _pebConfig.prefixStart.toString().length), 10);
      if (extract < parseInt(_pebConfig.prefixStart, 10) || extract > parseInt(_pebConfig.prefixEnd, 10)) continue;
    } else continue;

    //extract details from barcode
    scannedItem = createScannedItemFromBarcode(_pebConfig, scannedBarcode);
    //If we found a match then set response
    if (scannedItem !== null) {
      found = true;
      if (_pebConfig.itemOffset > 0) {
        scannedItem.barcodeType = BarcodeType.SHELF;
      } else {
        scannedItem.barcodeType = BarcodeType.PEB;
      }
    }
  }

  return scannedItem;
};

export const createScannedItemFromBarcode = (pebConfig, data) => {
  const scanItem: BarcodeData = { isValidBarcode: false, barcodeType: BarcodeType.PEB };
  scanItem.retrievedBarcode = data;
  scanItem.calculatedBarcode = data;
  //check if priceOffset is defined
  if (pebConfig.priceOffset > 0 && data.length > pebConfig.priceOffset) {
    //need to subtract 1 as offset starts at 1 not 0
    scanItem.retrievePrice = parseFloat(
      data.substring(pebConfig.priceOffset - 1, pebConfig.priceLength + (pebConfig.priceOffset - 1))
    );
    //replace price part with zeros to be used to find article match
    scanItem.calculatedBarcode =
      data.slice(0, pebConfig.priceOffset - 1) + fillDecimals('0', pebConfig.priceLength - 1);
    //add suffix if present
    if (data.length > pebConfig.priceOffset + pebConfig.priceLength - 1)
      scanItem.calculatedBarcode += data.slice(pebConfig.priceOffset + pebConfig.priceLength - 1);
    //if we need to convert to decimal places
    if (scanItem.retrievePrice > 0 && pebConfig.priceDecimals > 0) {
      scanItem.retrievePrice = scanItem.retrievePrice / parseInt(fillDecimals('1', pebConfig.priceDecimals));
      scanItem.suppliedPrice = scanItem.retrievePrice;
    }
  }
  //check if qtyOffset is defined
  if (pebConfig.qtyOffset > 0 && data.length > pebConfig.qtyOffset) {
    //Need to update current barcode to further validation
    data = scanItem.calculatedBarcode;
    //need to subtract 1 as offset starts at 1 not 0
    scanItem.retrievedQty = parseFloat(
      data.substring(pebConfig.qtyOffset - 1, pebConfig.qtyLength + (pebConfig.qtyOffset - 1))
    );
    //replace qty part with zeros to be used to find article match
    scanItem.calculatedBarcode = data.slice(0, pebConfig.qtyOffset - 1) + fillDecimals('0', pebConfig.qtyLength - 1);
    //add suffix if present
    if (data.length > pebConfig.qtyOffset + pebConfig.qtyLength - 1)
      scanItem.calculatedBarcode += data.slice(pebConfig.qtyOffset + pebConfig.qtyLength - 1);
    //if we need to convert to decimal places
    if (scanItem.retrievedQty > 0 && pebConfig.qtyDecimals > 0) {
      scanItem.retrievedQty = scanItem.retrievedQty / parseInt(fillDecimals('1', pebConfig.qtyDecimals));
    }
  }

  //check if itemOffset is defined
  if (pebConfig.itemOffset > 0 && data.length > pebConfig.itemOffset) {
    //Need to update current barcode to further validation
    data = scanItem.calculatedBarcode;
    //need to subtract 1 as offset starts at 1 not 0
    scanItem.retrievedItem = parseFloat(
      data.substring(pebConfig.itemOffset - 1, pebConfig.itemLength + (pebConfig.itemOffset - 1))
    );
    //replace qty part with zeros to be used to find article match
    scanItem.calculatedBarcode = data.slice(0, pebConfig.itemOffset - 1) + fillDecimals('0', pebConfig.itemLength - 1);
    //add suffix if present
    if (data.length > pebConfig.itemOffset + pebConfig.itemLength - 1)
      scanItem.calculatedBarcode += data.slice(pebConfig.itemOffset + pebConfig.itemLength - 1);
  }

  //Some barcodes contain additional checkDigits - we need to remove them to find a proper match
  if (scanItem.calculatedBarcode.length > g_zeroDigitOffset) {
    //Need to update current barcode to further validation
    data = scanItem.calculatedBarcode;
    //replace price part with zeros to be used to find article match
    scanItem.calculatedBarcode = data.slice(0, g_zeroDigitOffset - 1) + '0';
    //add suffix if present
    if (data.length > g_zeroDigitOffset) scanItem.calculatedBarcode += data.slice(g_zeroDigitOffset);
  }

  //if there are check digit - recalculate for calculatedBarcode
  if (pebConfig.checkDigitOffset > -1) {
    const checkDigit = eanCheckDigit(scanItem.calculatedBarcode.slice(0, pebConfig.checkDigitOffset - 1));
    scanItem.calculatedBarcode =
      scanItem.calculatedBarcode.slice(0, pebConfig.checkDigitOffset - 1) +
      checkDigit.toString() +
      scanItem.calculatedBarcode.slice(pebConfig.checkDigitOffset);
  }
  scanItem.isValidBarcode = true;
  return scanItem;
};

const fillDecimals = (number, length) => {
  let str = '' + number;
  while (str.length <= length) {
    str = str + '0';
  }
  return str;
};

const eanCheckDigit = (c) => {
  let a = 0;
  const b = c.split('').reverse().join('');
  for (let counter = 0; counter < b.length; counter++) {
    a = a + parseInt(b.charAt(counter), 10) * Math.pow(3, (counter + 1) % 2);
  }
  return (10 - (a % 10)) % 10;
};
