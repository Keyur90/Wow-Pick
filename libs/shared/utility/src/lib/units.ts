import Big from 'big.js';

export const convertKgToGrams = (value) => {
  const x = new Big(value);

  return x.times(1000).toNumber();
};

export const convertGramsToKg = (value) => {
  const x = new Big(value);

  return x.div(1000).toNumber();
};
