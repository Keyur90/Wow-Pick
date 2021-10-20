import { callBack } from '../call-back';
import { globalState } from '../../legacy-bootstrap';

export const trolleyDisplayItemNext = (history, event) => {
  // call new API to update orderAggregate
  if (globalState.featureFlags.normalTripEnabled && callBack.url !== null) {
    history.push(callBack.url, {
      action: callBack.action,
      substituteItem: event.data.args.substituteItem,
      trolleyItem: event.data.args.trolleyItem,
    });
  }
  return globalState.featureFlags.normalTripEnabled;
};
