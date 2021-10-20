import { camelizeKeys } from '@rf2/shared/utility';
import { globalState } from '../../legacy-bootstrap';

export const loginSuccessful = (history, event) => {
  const userContext = camelizeKeys(event.data.args.userContext);
  globalState.userContext = {
    ...userContext,
    userName: event.data.args.userName,
    branchNo: event.data.args.storeNo,
  };
  globalState.featureFlags = {
    normalTripEnabled: userContext.enableNewRfPlatformForNormalPickingTrip,
    isRfRedesignPickToPictureEnabled: userContext.isRfRedesignPickToPictureEnabled,
    showExpiryDateInfo: userContext.showExpiryDateInfo,
    canSkipToteBarcodeScan: !userContext.trayLabelScanningEnabled,
    showToteDialogForExpress: !userContext.isSingleOrderToteLabelScanningDisabled,
    isDataBarEnabled: userContext.isDatabarEnabled,
    validateExpiryShelfLife: userContext.validateExpiryShelfLife,
    defaultShelfLife: parseInt(userContext.defaultShelfLife),
    isDeliveryNowBagLabelEnabled: userContext.isDeliveryNowBagLabelEnabled,
    isCollectBagsRequiredEnabled: userContext.isCollectBagsRequiredEnabled,
    isSingleOrderToteLabelPrintingDisabled: userContext.isSingleOrderToteLabelPrintingDisabled,
    isSingleOrderDispatchEnabled: userContext.isSingleOrderRfDispatchEnabled,
    expressTripEnabled: userContext.expressPickingEnabled,
    isPayForEachBagEnabled: userContext.isPayForEachBagEnabled,
  };

  return false;
};
