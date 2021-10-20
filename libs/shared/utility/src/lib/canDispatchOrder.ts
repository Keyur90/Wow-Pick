import { GetNextTrip } from '@rf2/picking/data/api-contracts';

export const canDispatchOrder = (data: GetNextTrip, isSingleOrderDispatchEnabled: boolean): boolean => {
  return data?.isExpress && isSingleOrderDispatchEnabled;
};
