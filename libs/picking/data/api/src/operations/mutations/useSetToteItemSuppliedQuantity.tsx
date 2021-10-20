import { useApolloClient } from '@apollo/client';
import { ToteItem } from '@rf2/picking/data/api-contracts';
import { ArticleType, BarcodeData, SupplyTypes, updateSuppliedQuantities } from '@rf2/shared/utility';
import { hasSupplyQuantityModifiedVar } from '../../cache';

export const useSetToteItemSuppliedQuantity = () => {
  const client = useApolloClient();
  const cache = client.cache;

  const appendQuantityToToteItem = (
    toteItem: ToteItem,
    quantity: number,
    barcodeData?: BarcodeData,
    supplyType: SupplyTypes = SupplyTypes.PRIMARY
  ) => {
    const suppliedDetails = updateSuppliedQuantities(toteItem, quantity, barcodeData, supplyType);

    cache.modify({
      id: cache.identify({
        __typename: 'ToteItem',
        id: toteItem.id,
      }),
      fields: {
        suppliedDetails() {
          return suppliedDetails;
        },
      },
    });

    const previousState = hasSupplyQuantityModifiedVar();
    hasSupplyQuantityModifiedVar({
      isDirty: true,
      initialValue: previousState.initialValue,
      modifiedQuantity:
        toteItem.article.pricingUnit === ArticleType.EACH && toteItem.article.useWeightRange
          ? 1
          : previousState.modifiedQuantity + quantity,
    });
  };

  const resetToteItemQuantity = (toteItem: ToteItem) => {
    cache.modify({
      id: cache.identify({
        __typename: 'ToteItem',
        id: toteItem.id,
      }),
      fields: {
        suppliedDetails() {
          return [];
        },
      },
    });
    const previousState = hasSupplyQuantityModifiedVar();
    hasSupplyQuantityModifiedVar({
      isDirty: true,
      initialValue: previousState.initialValue,
      modifiedQuantity: 0,
    });
  };

  return {
    appendQuantityToToteItem,
    resetToteItemQuantity,
  };
};
