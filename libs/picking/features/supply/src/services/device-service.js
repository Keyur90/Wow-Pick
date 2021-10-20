export const deviceCallBackMethods = {
  scanArticle: 'doMainScan',
  scanTote: 'doToteLabellingScan',
  barcodeScanFailed: 'barcodeScan',
};

const isRunningInDevice = !!window.ECF;

export const triggerBeebTone = () => {
  if (isRunningInDevice) {
    window.ECF.javascriptCallback(deviceCallBackMethods.barcodeScanFailed, false);
  }
};
