import { Collectible } from '@rf2/picking/data/api-contracts';
import { useApolloClient } from '@apollo/client';

export const useSetCollectibleSuppliedQuantity = (): any => {
  const client = useApolloClient();
  const cache = client.cache;

  const setCollectibleSuppliedQuantity = (collectible: Collectible, quantity: number) => {
    const collectibleItem = {
      __typename: 'Collectible',
      id: collectible.id,
    };

    cache.modify({
      id: cache.identify(collectibleItem),
      fields: {
        suppliedQuantity(previousSuppliedQuanity) {
          return quantity;
        },
      },
    });
  };

  return { setCollectibleSuppliedQuantity };
};
