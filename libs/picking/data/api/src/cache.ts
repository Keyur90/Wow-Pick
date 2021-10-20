import { InMemoryCache, makeVar } from '@apollo/client';
import { Article, SuppliedDetail } from '@rf2/picking/data/api-contracts';
import { NormalTripState } from '@rf2/picking/types';
import { calculateTotalSuppliedQuantity, SupplyTypes } from '@rf2/shared/utility';

export const hasSupplyQuantityModifiedVar = makeVar({ isDirty: false, initialValue: 0, modifiedQuantity: 0 });

const initialTripState: NormalTripState = { viewAll: true, toteItemIndexToView: null };

export const currentTripStateVar = makeVar(initialTripState);

export const hasReturnedFromTripPickingEndSummary = makeVar(false);

export const printerPoolVar = makeVar(null);

export const apolloCache = new InMemoryCache({
  typePolicies: {
    // Type policy map
    ToteItem: {
      fields: {
        suppliedDetails: {
          merge(existing, incoming) {
            // Correct, thanks to invoking nested merge functions.
            return [...(existing ?? []), ...(incoming ?? [])];
          },
        },
        totalSuppliedQuantity: {
          read(_, { readField }) {
            const suppliedDetails = readField<SuppliedDetail[]>('suppliedDetails');
            const article = readField<Article>('article');
            return calculateTotalSuppliedQuantity(suppliedDetails, article.pricingUnit);
          },
        },
        isSubstituted: {
          read(_, { readField }) {
            const suppliedDetails = readField<SuppliedDetail[]>('suppliedDetails');
            return suppliedDetails?.findIndex(
              (x) => x.type === SupplyTypes.SILENTSUB || x.type === SupplyTypes.MANUALSUB
            ) > -1
              ? true
              : false;
          },
        },
        silentSubbed: {
          read(_, { readField }) {
            const suppliedDetails = readField<SuppliedDetail[]>('suppliedDetails');
            return suppliedDetails?.findIndex((x) => x.type === SupplyTypes.SILENTSUB) > -1 ? true : false;
          },
        },
      },
    },
    Collectible: {
      fields: {
        totalSuppliedQuantity: {
          read(_, { readField }) {
            const suppliedQuantity = readField('suppliedQuantity');
            return suppliedQuantity ?? 0;
          },
        },
      },
    },
  },
});
