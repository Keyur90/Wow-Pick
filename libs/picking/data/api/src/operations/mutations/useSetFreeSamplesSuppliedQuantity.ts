import { FreeSample } from '@rf2/picking/data/api-contracts';
import { useApolloClient } from '@apollo/client';

export const useSetFreeSampleSupplied = (): any => {
  const client = useApolloClient();
  const cache = client.cache;

  const setFreeSampleSupplied = (freeSample: FreeSample) => {
    const freeSampleItem = {
      __typename: 'FreeSample',
      id: freeSample.id,
    };
    cache.modify({
      id: cache.identify(freeSampleItem),
      fields: {
        suppliedQuantity(previousValue) {
          return 1;
        },
      },
    });
  };

  return { setFreeSampleSupplied };
};
