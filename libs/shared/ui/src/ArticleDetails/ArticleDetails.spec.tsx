import { ToteItem } from '@rf2/picking/data/api-contracts';
import { CollectOrder } from '@rf2/shared/utility';
import { render } from '@testing-library/react';
import React from 'react';
import { ArticleDetails } from './index';

const item: ToteItem = {
  id: '123',
  toteId: '111',
  itemIndex: 11,
  orderNo: '1234',
  articleId: 'AF1247',
  orderedQuantity: 7,
  stockOnHand: 235,
  article: { id: 'Af1247', brand: 'Coke', description: 'description', volumeSize: '500gm' },
  totalSuppliedQuantity: 5,
  suppliedDetails: [
    {
      type: 'primary',
      articleId: 'Af1247',
      scanDetails: [
        {
          barcode: '',
          suppliedPrice: 0,
          quantity: 5,
          weight: null,
          batchNo: '',
          expiryDate: '',
          dataBar: '',
        },
      ],
    },
  ],
  price: 10,
};

const order = {
  id: '1234',
  packagingType: 'ONLINE BAG',
  deliveryMethod: CollectOrder,
  locationCode: 5,
  deliveryDate: '2021-03-18T16:00:00',
  customerName: 'Suman',
};
const isRfRedesignPickToPictureEnabled = true;

describe('render Article Details', () => {
  it('should render ArticleDetails', async () => {
    const { container } = render(
      <ArticleDetails
        order={order}
        toteItem={item}
        isRfRedesignPickToPictureEnabled={isRfRedesignPickToPictureEnabled}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
