import _ from 'lodash';
import { ArticleType } from './constants';

export const calculateTotalSuppliedQuantity = (suppliedDetails, pricingUnit) => {
  let total = 0;
  if (suppliedDetails)
    if (pricingUnit === ArticleType.EACH) {
      total = suppliedDetails?.reduce(function (accumulator, item) {
        const totalQuantity = item.scanDetails?.reduce(function (accumulator, value) {
          return accumulator + value.quantity;
        }, 0);
        return accumulator + totalQuantity;
      }, 0);
    } else {
      total = suppliedDetails?.reduce(function (accumulator, item) {
        const totalQuantity = item.scanDetails?.reduce(function (accumulator, value) {
          return accumulator + value.weight;
        }, 0);
        return accumulator + totalQuantity;
      }, 0);
    }
  return _.round(total, 3);
};
