export interface FeatureFlags {
  nextTrolleyTrip: boolean;
  nextExpressTrolleyTrip: boolean;
  sequenceWhileInTrip: boolean;
  substitutionWhileInTrip: boolean;
  canSkipToteBarcodeScan: boolean;
  showToteDialogForExpress: boolean;
}

export const featureFlags: FeatureFlags = {
  nextTrolleyTrip: true,
  nextExpressTrolleyTrip: false,
  sequenceWhileInTrip: false,
  substitutionWhileInTrip: false,
  canSkipToteBarcodeScan: false,
  showToteDialogForExpress: true,
};

// featureFlags = {
//   nextTrolleyTrip: true,
//   nextExpressTrolleyTrip: false,
//   sequenceWhileInTrip: false,
//   substitutionWhileInTrip: false,
// };
