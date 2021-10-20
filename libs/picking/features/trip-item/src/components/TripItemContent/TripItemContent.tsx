import React from 'react';
import { ToteItem, Order, Tote } from '@rf2/picking/data/api-contracts';
import { ArticleDetails, ItemQuantities } from '@rf2/ui';
import { PersonalShopperNotes } from './components/PersonalShopperNotes';
import { ExpiryDetails } from './components/ExpiryDetails';

interface TripItemContentPropTypes {
  toteItem: ToteItem;
  tote: Tote;
  order: Order;
  isRfRedesignPickToPictureEnabled: boolean;
  showExpiryDateInfo: boolean;
  defaultShelfLife: number;
}

const TripItemContent: React.FC<TripItemContentPropTypes> = ({
  order,
  toteItem,
  tote,
  isRfRedesignPickToPictureEnabled,
  showExpiryDateInfo,
  defaultShelfLife,
}) => {
  const showExpiry = showExpiryDateInfo && toteItem.article.isPerishable;
  return (
    <>
      <ArticleDetails
        order={order}
        toteItem={toteItem}
        isRfRedesignPickToPictureEnabled={isRfRedesignPickToPictureEnabled}
      />
      <ItemQuantities order={order} toteItem={toteItem} tote={tote} showExpiry={showExpiry} />
      {showExpiry && (
        <ExpiryDetails
          deliveryDate={order.deliveryDate}
          preferredShelfLife={toteItem.article.preferredShelfLife}
          minShelfLife={toteItem.article.minShelfLife}
          defaultShelfLife={defaultShelfLife}
        ></ExpiryDetails>
      )}
      {toteItem.personalShopperNotes && <PersonalShopperNotes message={toteItem.personalShopperNotes} />}
    </>
  );
};

export { TripItemContent };
