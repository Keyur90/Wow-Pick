//This are the functions are called by the android shell.
//Shell injects javascript to query which scanning function should be called depending on the scenario
// When Legacy MFE is mounted these function must be exposed for the scanning to work properly

import { getIsLegacyAppDisplayed as isLegacyAppDisplayed } from './legacy-status';
import PubSub from 'pubsub-js';
import { BarcodeScanEvents } from '@rf2/shared/utility';

let legacyWindow;

window.doMainScan = function (data, source) {
  if (isLegacyAppDisplayed()) {
    return getLegacyWindow().doMainScan(data, source);
  } else {
    // pass the scan data to rfv2 mf picking screen
    PubSub.publish(BarcodeScanEvents.BARCODE_SCAN, data);
    return true;
  }
};

window.deviceDetected = function (deviceType) {
  if (isLegacyAppDisplayed()) {
    return getLegacyWindow().deviceDetected(deviceType);
  } else {
    // pass the scan data to rfv2 mf picking screen
  }
};

window.signalLoss = function (signalStrength, signalQuality) {
  if (isLegacyAppDisplayed()) {
    return getLegacyWindow().signalLoss(signalStrength, signalQuality);
  } else {
    // pass the scan data to rfv2 mf picking screen
  }
};

window.doSequenceScan = function (data, source) {
  if (isLegacyAppDisplayed()) {
    return getLegacyWindow().doSequenceScan(data, source);
  } else {
    // pass the scan data to rfv2 mf picking screen
  }
};

window.doBayLabelScan = function (data, source) {
  if (isLegacyAppDisplayed()) {
    return getLegacyWindow().doBayLabelScan(data, source);
  } else {
    // pass the scan data to rfv2 mf picking screen
  }
};

window.doToteLabellingScan = function (data, source) {
  if (isLegacyAppDisplayed()) {
    return getLegacyWindow().doToteLabellingScan(data, source);
  } else {
    // pass the scan data to rfv2 mf picking screen
  }
};

const isRunningInDevice = !!window.ECF;
const letterBKeyCode = 2;

if (!isRunningInDevice) {
  window.onkeypress = function (e) {
    if (e.ctrlKey && e.keyCode === letterBKeyCode) {
      PubSub.publishSync(BarcodeScanEvents.BARCODE_SCAN, window.prompt('Enter barcode to be scanned'));
    }
  };
}
export function getLegacyWindow() {
  if (!legacyWindow) {
    legacyWindow = document.getElementById('legacyRF').contentWindow.window;
  }

  return legacyWindow;
}
