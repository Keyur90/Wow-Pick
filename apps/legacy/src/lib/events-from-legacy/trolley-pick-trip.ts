import { normalTripFeatureFlags } from '@rf2/shared/feature-flags';
import { TrolleyType } from '@rf2/shared/utility';
import { globalState } from '../../legacy-bootstrap';

export const trolleyPickTrip = (history, event) => {
  if (globalState.featureFlags.normalTripEnabled && normalTripFeatureFlags.nextTrolleyTrip) {
    globalState.trolleyType = TrolleyType.NORMAL;
    history.push('/picking', event.data.args);
  }
  return globalState.featureFlags.normalTripEnabled && normalTripFeatureFlags.nextTrolleyTrip;
};
