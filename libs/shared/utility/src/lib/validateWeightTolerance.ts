import { ArticleType, quantityValidationErrors } from './constants';
import {
  isExceedingSecondaryEachWeightRange,
  isExceedingSecondaryWeightRange,
  isGreaterThanZero,
  isInPrimaryEachWeightRange,
  isInPrimaryWeightRange,
  isInSecondaryEachWeightRange,
  isInSecondaryWeightRange,
  isLessThanMinWeight,
} from './quantityRange';

import { toNumber as _toNumber, isNaN as _isNaN } from 'lodash';

export const validateWeightTolerance = (weight, currentToteItem) => {
  const article = currentToteItem?.article;
  let weightValidationError = null;
  const isKgArticle = article.pricingUnit === ArticleType.KG;
  const isWeightRangedArticle = article.pricingUnit === ArticleType.EACH && article.useWeightRange;

  // This block just makes sure the weight is >=minWeight or <=maxWeight
  if (isKgArticle) {
    weightValidationError = hasKgBarcodeValidationError(
      weight,
      currentToteItem.totalSuppliedQuantity,
      currentToteItem.orderedQuantity,
      article.weightPrimaryTolerance,
      article.weightOverride
    );
  } else if (article.useWeightRange) {
    weightValidationError = hasEachWeightBarcodeValidationError(
      weight,
      article.minWeight ?? 0,
      article.maxWeight ?? 0,
      article.weightPrimaryTolerance,
      article.weightOverride
    );
  }

  if (weightValidationError !== null) {
    return weightValidationError;
  }

  // This block just makes sure the weight is within min or max Range when weight override flag is enabled
  if (
    (isKgArticle && isExceedingSecondaryWeightRange(weight, currentToteItem)) ||
    (article?.useWeightRange && isExceedingSecondaryEachWeightRange(weight, currentToteItem))
  ) {
    weightValidationError = quantityValidationErrors.WEIGHT_EXCEEDING_SECONDARY_WEIGHT_RANGE;
  } else if (
    (isKgArticle && isInSecondaryWeightRange(weight, currentToteItem)) ||
    (article?.useWeightRange && isInSecondaryEachWeightRange(weight, currentToteItem))
  ) {
    weightValidationError = quantityValidationErrors.WEIGHT_EXCEEDING_PRIMARY_WEIGHT_RANGE_BUT_WITHIN_SECONDARY;
  }

  return weightValidationError;
};

export const hasEachWeightBarcodeValidationError = (
  value,
  minWeight,
  maxWeight,
  primaryWeightTolerance,
  hasWeightOverride
) => {
  const numberValue = _toNumber(value);
  const { WEIGHT_BELOW_LIMIT, WEIGHT_QUANTITY_EXCEEDS_PRIMARY_TOLERANCE } = quantityValidationErrors;

  if (isLessThanMinWeight(numberValue, minWeight)) {
    return WEIGHT_BELOW_LIMIT;
  } else if (!isInPrimaryEachWeightRange(numberValue, maxWeight, primaryWeightTolerance)) {
    return WEIGHT_QUANTITY_EXCEEDS_PRIMARY_TOLERANCE;
  } else {
    return null;
  }
};

export const hasKgBarcodeValidationError = (
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
  } else if (!isInPrimaryWeightRange(numberValue, suppliedQuantity, orderedQuantity, primaryWeightTolerance)) {
    return WEIGHT_QUANTITY_EXCEEDS_PRIMARY_TOLERANCE;
  } else {
    return null;
  }
};
