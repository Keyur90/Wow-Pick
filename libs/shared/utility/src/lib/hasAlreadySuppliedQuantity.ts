import Big from 'big.js';

export const hasAlreadySupplied = (suppliedQuantity, orderedQuantity, isWeight, weightTolerance) => {
  const tmpSuppliedQuantity = new Big(suppliedQuantity);
  const tmpOrderedQuantity = new Big(orderedQuantity);

  if (isWeight && weightTolerance) {
    const tmpWeightTolerance = new Big(weightTolerance);
    const variance = tmpOrderedQuantity.times(tmpWeightTolerance.div(100)).toNumber();
    return tmpSuppliedQuantity.gte(tmpOrderedQuantity.minus(variance));
  } else {
    return tmpSuppliedQuantity.gte(orderedQuantity);
  }
};
