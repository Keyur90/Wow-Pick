import { renderHook } from '@testing-library/react-hooks';
import { cloneDeep as _cloneDeep } from 'lodash';
import { useInputQuantityValidation } from './useInputValidation';
import { quantityValidationErrors } from '../constants';
import { getNextTripMock } from '@rf2/picking/data/mocks';

describe('hook useInputQuantityValidation', () => {
  const mockToteItem = _cloneDeep(getNextTripMock.result.data.getNextTrip.toteItems[0]);

  test('should be a valid quantity', () => {
    const { result } = renderHook(() => useInputQuantityValidation(3, mockToteItem));

    expect(result.current.inputError).toBe(null);
  });

  test('should be an invalid quantity value due not being a number', () => {
    const { result } = renderHook(() => useInputQuantityValidation('abc', mockToteItem));

    expect(result.current.inputError).toBe(quantityValidationErrors.VALID_QUANTITY);
  });

  test('should be an invalid quantity value due to being a decimal number', () => {
    const { result } = renderHook(() => useInputQuantityValidation(1.2, mockToteItem));

    expect(result.current.inputError).toBe(quantityValidationErrors.DECIMALS_NOT_ALLOWED);
  });

  test('should be an invalid quantity value due to being less than 1', () => {
    const { result } = renderHook(() => useInputQuantityValidation(-1, mockToteItem));

    expect(result.current.inputError).toBe(`${quantityValidationErrors.QUANTITY_WITHIN_RANGE} 3`);
  });

  test('should be an invalid quantity value due to exceeding ordered quantity', () => {
    const { result } = renderHook(() => useInputQuantityValidation(12, mockToteItem));

    expect(result.current.inputError).toBe(`${quantityValidationErrors.QUANTITY_WITHIN_RANGE} 3`);
  });
});
