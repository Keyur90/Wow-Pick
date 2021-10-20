import { useApolloClient } from '@apollo/client';
import { GetNextTrip } from '@rf2/picking/data/api-contracts';

export const useSetElapsedTime = () => {
  const client = useApolloClient();
  const cache = client.cache;

  const setElapsedTime = (getNextTrip: GetNextTrip, time: number) => {
    cache.modify({
      id: cache.identify({
        __typename: 'GetNextTrip',
        id: getNextTrip.id,
      }),
      fields: {
        elapsedTime(previousValue) {
          return previousValue + time;
        },
      },
    });
  };

  return {
    setElapsedTime,
  };
};
