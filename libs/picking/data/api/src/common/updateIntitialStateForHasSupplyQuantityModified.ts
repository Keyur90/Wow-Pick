import { hasSupplyQuantityModifiedVar } from '../cache';

// reset the state every time navigate between trip items
export const updateIntitialStateForHasSupplyQuantityModified = (initialSuppliedQuantity) => {
  hasSupplyQuantityModifiedVar({
    isDirty: false,
    initialValue: initialSuppliedQuantity,
    modifiedQuantity: 0,
  });
};
