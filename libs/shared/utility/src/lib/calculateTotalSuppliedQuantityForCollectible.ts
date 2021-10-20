import _ from 'lodash';

export const calculateTotalSuppliedQuantityForCollectible = (suppliedDetails) => {
  let total = 0;
  if (suppliedDetails)
    total = suppliedDetails?.reduce(function (accumulator, item) {
      return accumulator + item.quantity;
    }, 0);
  return _.round(total, 3);
};
