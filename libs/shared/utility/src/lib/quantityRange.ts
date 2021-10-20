import { ToteItem } from '@rf2/picking/data/api-contracts';
import Big from 'big.js';
import { convertKgToGrams } from './units';

export const isGreaterThanZero = (value) => {
  const tmpValue = new Big(value);

  return tmpValue.gt(0);
};

export const isLessThanMinWeight = (value, minWeight) => {
  const tmpValue = new Big(value);

  return tmpValue.lt(convertKgToGrams(minWeight));
};

export const isInRange = (value, suppliedQuantity, orderedQuantity) => {
  const tmpValue = new Big(value);

  return tmpValue.gt(0) && tmpValue.plus(suppliedQuantity).lte(orderedQuantity);
};

export const isInPrimaryWeightRange = (value, suppliedQuantity, orderedQuantity, primaryWeightTolerance) => {
  const tmpValue = new Big(value);
  const tmpOrderedQuantity = new Big(convertKgToGrams(orderedQuantity));
  const tmpWeightTolerance = new Big(primaryWeightTolerance);
  const weightVariance = tmpOrderedQuantity.times(tmpWeightTolerance.div(100)).toNumber();

  return (
    tmpValue.gt(0) && tmpValue.plus(convertKgToGrams(suppliedQuantity)).lte(tmpOrderedQuantity.plus(weightVariance))
  );
};

export const isInSecondaryWeightRange = (value: number, toteItem: ToteItem) => {
  const tmpValue = new Big(value);
  const tmpOrderedQuantity = new Big(convertKgToGrams(toteItem.orderedQuantity));
  const tmpPrimaryWeightTolerance = new Big(toteItem.article.weightPrimaryTolerance);
  const primaryWeightVariance = tmpOrderedQuantity.times(tmpPrimaryWeightTolerance.div(100)).toNumber();
  const tmpSecondaryWeightTolerance = new Big(toteItem.article.weightSecondaryTolerance);
  const secondaryWeightVariance = tmpOrderedQuantity.times(tmpSecondaryWeightTolerance.div(100)).toNumber();

  return (
    tmpValue
      .plus(convertKgToGrams(toteItem.totalSuppliedQuantity))
      .gt(tmpOrderedQuantity.plus(primaryWeightVariance)) &&
    tmpValue
      .plus(convertKgToGrams(toteItem.totalSuppliedQuantity))
      .lte(tmpOrderedQuantity.plus(secondaryWeightVariance))
  );
};

export const isExceedingSecondaryWeightRange = (value: number, toteItem: ToteItem) => {
  const tmpValue = new Big(value);
  const tmpOrderedQuantity = new Big(convertKgToGrams(toteItem.orderedQuantity));
  const tmpSecondaryWeightTolerance = new Big(toteItem.article.weightSecondaryTolerance);
  const secondaryWeightVariance = tmpOrderedQuantity.times(tmpSecondaryWeightTolerance.div(100)).toNumber();

  return tmpValue
    .plus(convertKgToGrams(toteItem.totalSuppliedQuantity))
    .gt(tmpOrderedQuantity.plus(secondaryWeightVariance));
};

export const isInPrimaryEachWeightRange = (value, maxWeight, primaryWeightTolerance) => {
  const tmpValue = new Big(value);
  const tmpMaxWeight = new Big(convertKgToGrams(maxWeight));
  const tmpWeightTolerance = new Big(primaryWeightTolerance);
  const weightVariance = tmpMaxWeight.times(tmpWeightTolerance.div(100)).toNumber();

  return tmpValue.lte(tmpMaxWeight.plus(weightVariance));
};

export const isInSecondaryEachWeightRange = (value: number, toteItem: ToteItem) => {
  const tmpValue = new Big(value);
  const tmpMaxWeight = new Big(convertKgToGrams(toteItem.article.maxWeight));
  const tmpPrimaryWeightTolerance = new Big(toteItem.article.weightPrimaryTolerance);
  const primaryWeightVariance = tmpMaxWeight.times(tmpPrimaryWeightTolerance.div(100)).toNumber();
  const tmpSecondaryWeightTolerance = new Big(toteItem.article.weightSecondaryTolerance);
  const secondaryWeightVariance = tmpMaxWeight.times(tmpSecondaryWeightTolerance.div(100)).toNumber();

  return (
    tmpValue.gt(tmpMaxWeight.plus(primaryWeightVariance)) && tmpValue.lte(tmpMaxWeight.plus(secondaryWeightVariance))
  );
};

export const isExceedingSecondaryEachWeightRange = (value: number, toteItem: ToteItem) => {
  const tmpValue = new Big(value);
  const tmpMaxWeight = new Big(convertKgToGrams(toteItem.article.maxWeight));
  const tmpSecondaryWeightTolerance = new Big(toteItem.article.weightSecondaryTolerance);
  const secondaryWeightVariance = tmpMaxWeight.times(tmpSecondaryWeightTolerance.div(100)).toNumber();

  return tmpValue.gt(tmpMaxWeight.plus(secondaryWeightVariance));
};
