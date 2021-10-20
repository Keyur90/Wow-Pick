import { normalTripFeatureFlags } from '@rf2/shared/feature-flags';
import { globalState } from '../../legacy-bootstrap';
import { callBack } from '../call-back';

export const trolleySubExit = (history, event) => {
  // ToDo: route to right micro front end page in the new app
  if (
    globalState.featureFlags.normalTripEnabled &&
    normalTripFeatureFlags.substitutionWhileInTrip &&
    callBack.url !== null
  ) {
    history.push(callBack.url, { action: callBack.action });
  }

  return globalState.featureFlags.normalTripEnabled && normalTripFeatureFlags.substitutionWhileInTrip;
};
