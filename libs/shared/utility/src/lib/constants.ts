export const CollectOrder = 'COLLECT';
export const DeliveryOrder = 'DELIVERY';
export const PickingZoneNames = {
  AMBIENT: 'Ambient',
  CHILLED: 'Chilled',
  FREEZER: 'Freezer',
  FRESH: 'Fresh',
  SECURITY: 'Security',
};
export const PackagingTypes = {
  NO_BAGS: 'NO BAGS',
  PLASTIC: 'ONLINE BAG',
  PAPER: 'PAPER BAG',
};

export const ArticleType = {
  EACH: 'EACH',
  KG: 'KG',
};

export const BarcodeScanEvents = {
  BARCODE_SCAN: 'DEVICE:ScannedData',
};

export const quantityValidationErrors = {
  VALID_QUANTITY: 'Please enter a valid quantity',
  DECIMALS_NOT_ALLOWED: 'Decimals not allowed',
  QUANTITY_GREATER_THAN_ZERO: 'Please enter a quantity, more than 0',
  QUANTITY_WITHIN_RANGE: 'Please enter a quantity, more than 0, not more than ',
  WEIGHT_QUANTITY_EXCEEDS_PRIMARY_TOLERANCE: 'Article exceeds tolerance - select an alternative',
  WEIGHTS_DO_NOT_MATCH: 'Weights do not match',
  WEIGHT_BELOW_LIMIT: 'Article is below the limit - select an alternative',
  WEIGHT_EXCEEDING_SECONDARY_WEIGHT_RANGE: 'ExceedingSecondaryWeightRange',
  WEIGHT_EXCEEDING_PRIMARY_WEIGHT_RANGE_BUT_WITHIN_SECONDARY: 'ExceedingPrimaryToleranceButWithinSecondary',
};

export const labelValidationErrors = {
  LABEL_COUNT_CANNOT_EXCEED_36: 'Label count cannot exceed 36',
};

export const barcodeValidationErrors = {
  INVALID_BARCODE_FOR_LABEL: 'Identifier invalid for the label',
};

export enum SupplyTypes {
  PRIMARY = 'Primary',
  SILENTSUB = 'SilentSub',
  MANUALSUB = 'ManualSub',
}

export const mockPEBConfigs = [
  {
    id: 1,
    description: 'Prefix 02',
    prefixStart: '02',
    prefixEnd: null,
    barcodeLength: 13,
    priceOffset: 8,
    priceLength: 5,
    priceDecimals: 2,
    qtyOffset: 0,
    qtyLength: 0,
    qtyDecimals: 0,
    itemLength: 0,
    itemOffset: 0,
    checkDigitOffset: 13,
  },
  {
    id: 2,
    description: 'Prefix Range 20-29',
    prefixStart: '20',
    prefixEnd: '29',
    barcodeLength: 13,
    priceOffset: 8,
    priceLength: 5,
    priceDecimals: 2,
    qtyOffset: 0,
    qtyLength: 0,
    qtyDecimals: 0,
    itemLength: 0,
    itemOffset: 0,
    checkDigitOffset: 13,
  },
  {
    id: 3,
    description: 'Prefix Range 20-29 len_12',
    prefixStart: '20',
    prefixEnd: '29',
    barcodeLength: 12,
    priceOffset: 7,
    priceLength: 5,
    priceDecimals: 2,
    qtyOffset: 0,
    qtyLength: 0,
    qtyDecimals: 0,
    itemLength: 0,
    itemOffset: 0,
    checkDigitOffset: 12,
  },
  {
    id: 4,
    description: 'ShelveEdge Labels for article barcodes',
    prefixStart: '950',
    prefixEnd: null,
    barcodeLength: 16,
    priceOffset: 0,
    priceLength: 0,
    priceDecimals: 0,
    qtyOffset: 0,
    qtyLength: 0,
    qtyDecimals: 0,
    itemLength: 6,
    itemOffset: 4,
    checkDigitOffset: -1,
  },
  {
    id: 5,
    description: 'ShelveEdgeLabels for article barcodes',
    prefixStart: '960',
    prefixEnd: null,
    barcodeLength: 16,
    priceOffset: 0,
    priceLength: 0,
    priceDecimals: 0,
    qtyOffset: 0,
    qtyLength: 0,
    qtyDecimals: 0,
    itemLength: 10,
    itemOffset: 4,
    checkDigitOffset: -1,
  },
];

export const TrafficLightStatus = {
  Green: '#00FF00',
  Yellow: '#FFF000',
  Red: '#D00202',
};

export const TrafficLightThreshold = 85;

export const LegacyEvents = {
  ExecuteEventsInLegacy: 'LegacyEvents:ExecuteEventsInLegacy',
};

export const LegacyEventTypes = {
  ExitToTrolleyMain: 'exitToMenu',
};
