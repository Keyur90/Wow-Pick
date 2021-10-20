import { useState, useEffect } from 'react';
import { toNumber as _toNumber, isNaN as _isNaN } from 'lodash';
import { quantityValidationErrors } from '../constants';

const hasValidationError = (value, quantityValue) => {
  const { WEIGHTS_DO_NOT_MATCH } = quantityValidationErrors;

  if (value !== quantityValue) {
    return WEIGHTS_DO_NOT_MATCH;
  } else {
    return null;
  }
};

export const useSecondaryToleranceValidation = (inputValue, quantityValue) => {
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    setInputError(hasValidationError(inputValue, quantityValue));
  }, [inputValue, quantityValue]);

  return { inputError };
};
