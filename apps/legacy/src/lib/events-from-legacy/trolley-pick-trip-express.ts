import { normalTripFeatureFlags } from '@rf2/shared/feature-flags';
import { TrolleyType } from '@rf2/shared/utility';
import { globalState } from '../../legacy-bootstrap';

export const trolleyPickExpressTrip = (history, event) => {
  if (globalState.featureFlags.expressTripEnabled && normalTripFeatureFlags.nextExpressTrolleyTrip) {
    globalState.trolleyType = TrolleyType.EXPRESS;
    history.push('/picking', event.data.args);
  }
  return globalState.featureFlags.normalTripEnabled && normalTripFeatureFlags.nextTrolleyTrip;
};
