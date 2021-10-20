import { useState, useEffect } from 'react';
import { toNumber as _toNumber, isNaN as _isNaN, find as _find } from 'lodash';
import Big from 'big.js';
import { quantityValidationErrors, barcodeValidationErrors, labelValidationErrors } from '../constants';
import {
  isInRange,
  isInPrimaryWeightRange,
  isGreaterThanZero,
  isLessThanMinWeight,
  isInPrimaryEachWeightRange,
} from '../quantityRange';
import { ArticleType } from '@rf2/shared/utility';
import { Collectible, ToteItem, Tote } from '@rf2/picking/data/api-contracts';

const hasBarcodeValidationError = (value, totes) => {
  const { INVALID_BARCODE_FOR_LABEL } = barcodeValidationErrors;

  if (!_find(totes, { barcode: value })) {
    return INVALID_BARCODE_FOR_LABEL;
  } else {
    return null;
  }
};

const hasDeliveryLabelQuantityValidationError = (value) => {
  const numberValue = _toNumber(value);
  const strValue = value.toString();
  const { VALID_QUANTITY, DECIMALS_NOT_ALLOWED } = quantityValidationErrors;
  const { LABEL_COUNT_CANNOT_EXCEED_36 } = labelValidationErrors;

  if (strValue.trim() === '' || _isNaN(numberValue)) {
    return VALID_QUANTITY;
  } else if (strValue.indexOf('.') !== -1) {
    return DECIMALS_NOT_ALLOWED;
  } else if (numberValue < 0) {
    return VALID_QUANTITY;
  } else if (numberValue > 36) {
    return LABEL_COUNT_CANNOT_EXCEED_36;
  } else {
    return null;
  }
};

const hasLabelQuantityValidationError = (value) => {
  const numberValue = _toNumber(value);
  const strValue = value.toString();
  const { VALID_QUANTITY, DECIMALS_NOT_ALLOWED, QUANTITY_GREATER_THAN_ZERO } = quantityValidationErrors;
  const { LABEL_COUNT_CANNOT_EXCEED_36 } = labelValidationErrors;

  if (strValue.trim() === '' || _isNaN(numberValue)) {
    return VALID_QUANTITY;
  } else if (strValue.indexOf('.') !== -1) {
    return DECIMALS_NOT_ALLOWED;
  } else if (numberValue <= 0) {
    return QUANTITY_GREATER_THAN_ZERO;
  } else if (numberValue > 36) {
    return LABEL_COUNT_CANNOT_EXCEED_36;
  } else {
    return null;
  }
};

export const hasKgValidationError = (
  value,
  suppliedQuantity,
  orderedQuantity,
  primaryWeightTolerance,
  hasWeightOverride
) => {
  const numberValue = _toNumber(value);
  const strValue = value.toString();
  const {
    VALID_QUANTITY,
    DECIMALS_NOT_ALLOWED,
    QUANTITY_GREATER_THAN_ZERO,
    WEIGHT_QUANTITY_EXCEEDS_PRIMARY_TOLERANCE,
  } = quantityValidationErrors;

  if (strValue.trim() === '' || _isNaN(numberValue)) {
    return VALID_QUANTITY;
  } else if (strValue.indexOf('.') !== -1) {
    return DECIMALS_NOT_ALLOWED;
  } else if (!isGreaterThanZero(numberValue)) {
    return QUANTITY_GREATER_THAN_ZERO;
  } else if (
    !hasWeightOverride &&
    !isInPrimaryWeightRange(numberValue, suppliedQuantity, orderedQuantity, primaryWeightTolerance)
  ) {
    return WEIGHT_QUANTITY_EXCEEDS_PRIMARY_TOLERANCE;
  } else {
    return null;
  }
};

export const hasEachWeightValidationError = (
  value,
  minWeight,
  maxWeight,
  primaryWeightTolerance,
  hasWeightOverride
) => {
  const numberValue = _toNumber(value);
  const strValue = value.toString();
  const {
    VALID_QUANTITY,
    DECIMALS_NOT_ALLOWED,
    QUANTITY_GREATER_THAN_ZERO,
    WEIGHT_BELOW_LIMIT,
    WEIGHT_QUANTITY_EXCEEDS_PRIMARY_TOLERANCE,
  } = quantityValidationErrors;

  if (strValue.trim() === '' || _isNaN(numberValue)) {
    return VALID_QUANTITY;
  } else if (strValue.indexOf('.') !== -1) {
    return DECIMALS_NOT_ALLOWED;
  } else if (!isGreaterThanZero(numberValue)) {
    return QUANTITY_GREATER_THAN_ZERO;
  } else if (isLessThanMinWeight(numberValue, minWeight)) {
    return WEIGHT_BELOW_LIMIT;
  } else if (!hasWeightOverride && !isInPrimaryEachWeightRange(numberValue, maxWeight, primaryWeightTolerance)) {
    return WEIGHT_QUANTITY_EXCEEDS_PRIMARY_TOLERANCE;
  } else {
    return null;
  }
};

const hasEachValidationError = (value, suppliedQuantity, orderedQuantity) => {
  const numberValue = _toNumber(value);
  const strValue = value.toString();
  const { VALID_QUANTITY, DECIMALS_NOT_ALLOWED, QUANTITY_WITHIN_RANGE } = quantityValidationErrors;

  if (strValue.trim() === '' || _isNaN(numberValue)) {
    return VALID_QUANTITY;
  } else if (strValue.indexOf('.') !== -1) {
    return DECIMALS_NOT_ALLOWED;
  } else if (!isInRange(numberValue, suppliedQuantity, orderedQuantity)) {
    const tmpOrderedQuantity = new Big(orderedQuantity);
    return `${QUANTITY_WITHIN_RANGE} ${tmpOrderedQuantity.minus(suppliedQuantity).toNumber()}`;
  } else {
    return null;
  }
};

export const useInputQuantityValidation = (inputValue: string | number, toteItem: ToteItem | Collectible) => {
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    const {
      pricingUnit,
      useWeightRange,
      minWeight,
      maxWeight,
      weightPrimaryTolerance,
      weightOverride,
    } = toteItem.article;
    const isKgArticle = pricingUnit === ArticleType.KG;
    let error = null;

    if (isKgArticle) {
      error = hasKgValidationError(
        inputValue,
        toteItem.totalSuppliedQuantity,
        toteItem.orderedQuantity,
        weightPrimaryTolerance,
        weightOverride
      );
    } else if (useWeightRange) {
      error = hasEachWeightValidationError(
        inputValue,
        minWeight ?? 0,
        maxWeight ?? 0,
        weightPrimaryTolerance,
        weightOverride
      );
    } else {
      error = hasEachValidationError(inputValue, toteItem.totalSuppliedQuantity, toteItem.orderedQuantity);
    }
    setInputError(error);
  }, [inputValue, toteItem]);

  return { inputError };
};

export const useInputLabelQuantityValidation = (inputValue: string | number) => {
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    const error = hasLabelQuantityValidationError(inputValue);
    setInputError(error);
  }, [inputValue]);

  return { inputError };
};

export const useInputDeliveryLabelQuantityValidation = (inputValue: string | number) => {
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    const error = hasDeliveryLabelQuantityValidationError(inputValue);
    setInputError(error);
  }, [inputValue]);

  return { inputError };
};

export const useInputBarcodeValidation = (inputValue: string | number, totes: Tote[]) => {
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    const error = hasBarcodeValidationError(inputValue, totes);
    setInputError(error);
  }, [inputValue, totes]);

  return { inputError };
};
