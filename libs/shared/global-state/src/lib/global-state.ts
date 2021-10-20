import { UserContext } from '@rf2/shared/global-state';
import { TrolleyType } from '@rf2/shared/utility';
import { proxy } from 'valtio';

export interface GlobalState {
  userContext?: UserContext;
  featureFlags?: any;
  trolleyType: TrolleyType;
}

export const globalState = proxy<GlobalState>();
// userContext: new UserContext(),
// featureFlags: new FeatureFlags(),
// Add any state you need to share across the micro frontend apps
// For example logged in user info
