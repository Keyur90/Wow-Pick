import { PackagingTypes } from '@rf2/shared/utility';

export const shouldPrintBagLabelsForDeliveryNowOrders = (isDeliveryNowBagLabelEnabled, getNextTripData) =>
  isDeliveryNowBagLabelEnabled &&
  getNextTripData.isExpress &&
  !!getNextTripData?.orders?.filter((i) => i.deliveryMethod === 'DELIVERY').length &&
  !!getNextTripData?.orders?.filter((i) => i.packagingType !== PackagingTypes.NO_BAGS).length &&
  !!getNextTripData?.toteItems?.filter((i) => i.totalSuppliedQuantity > 0).length;

export const shouldPrintBagLabelsForDeliveryOrders = (isPayForEachBagEnabled, getNextTripData) =>
  isPayForEachBagEnabled &&
  !!getNextTripData?.orders?.filter((i) => i.deliveryMethod === 'DELIVERY').length &&
  !!getNextTripData?.orders?.filter((i) => i.packagingType !== PackagingTypes.NO_BAGS).length &&
  !!getNextTripData?.orders?.filter((i) => !i.isFlatFee).length;

export const shouldPrintBagLabelsForCollectOrders = (isCollectBagsRequiredEnabled, getNextTripData) =>
  isCollectBagsRequiredEnabled &&
  !!getNextTripData?.orders?.filter((i) => i.deliveryMethod === 'COLLECT').length &&
  !!getNextTripData?.orders?.filter((i) => i.packagingType !== PackagingTypes.NO_BAGS).length &&
  !!getNextTripData?.toteItems?.filter((i) => i.totalSuppliedQuantity > 0).length;
