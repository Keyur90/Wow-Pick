class NormalTripFeatureFlags {
  readonly loginSuccessful: boolean = false;
  readonly nextTrolleyTrip: boolean = true;
  readonly nextExpressTrolleyTrip: boolean = true;
  readonly sequenceWhileInTrip: boolean = false;
  readonly substitutionWhileInTrip: boolean = false;
}

export const normalTripFeatureFlags = new NormalTripFeatureFlags();
