import { PackagingTypes, PickingZoneNames } from '@rf2/shared/utility';
import { render } from '@testing-library/react';
import React from 'react';
import { ItemQuantities } from './ItemQuantities';

const toteItem = {
  id: '28391',
  toteId: '1',
  itemIndex: 0,
  orderNo: '1',
  articleId: '28391',
  aisle: '9',
  bay: '56',
  shelf: '2',
  orderedQuantity: 3,
  currentPage: 1,
  totalPages: 3,
  stockOnHand: 3,
  article: {
    id: '28391',
    articleId: '28391',
    brand: 'Woolworths',
    description: 'Woolworths Pumpkin Cubes 480g',
    imageUrl: 'https://uat-assets.woolworths.com.au/images/1005/28391.jpg?impolicy=wowtofzcfpg&w=250&h=250',
    unitPrice: null,
    pricingUnit: null,
    volumeSize: '480',
  },
  totalSuppliedQuantity: 5,
  suppliedDetails: [
    {
      type: 'primary',
      articleId: '28391',
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
  secondaryArticleId: '124577',
  version: '0.0.1',
  price: 4.0,
  personalShopperNotes: 'Please only make a substitution if you really have too. As this is my favourite product.',
};

const tote = {
  id: '1',
  orderNo: '1',
  position: 1,
  pickingZoneId: 1,
  pickingZoneName: PickingZoneNames.AMBIENT,
  barcode: '140031688003',
  version: '1',
};

const order = {
  id: '1',
  packagingType: PackagingTypes.PLASTIC,
  deliveryMethod: 'COLLECT',
  locationCode: 5,
  deliveryDate: '2021-03-18T16:00:00',
  customerName: 'Dave',
};

describe('render ItemQuantities', () => {
  it('should render with an each pricing unit', async () => {
    const { container } = render(<ItemQuantities toteItem={toteItem} order={order} tote={tote} showExpiry={true} />);

    expect(container).toMatchSnapshot();
  });

  it('should render with a KG pricing unit', async () => {
    const { container } = render(
      <ItemQuantities
        toteItem={{ ...toteItem, article: { ...toteItem.article, pricingUnit: 'KG' } }}
        order={order}
        tote={tote}
        showExpiry={true}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should display tote position and plastic bag', async () => {
    const { findByText } = render(
      <ItemQuantities
        toteItem={{ ...toteItem }}
        order={{ ...order, packagingType: 'ONLINE BAG' }}
        tote={tote}
        showExpiry={true}
      />
    );

    const toteNode = await findByText(/tote/i);
    const toteValue = toteNode.nextSibling;
    expect(toteValue).toHaveTextContent(/1/i);
    expect(toteValue).toHaveTextContent(/plastic/i);
  });

  it('should display tote position and paper bag', async () => {
    const { findByText } = render(
      <ItemQuantities
        toteItem={{ ...toteItem }}
        order={{ ...order, packagingType: PackagingTypes.PAPER }}
        tote={{ ...tote, position: 2 }}
        showExpiry={true}
      />
    );

    const toteNode = await findByText(/tote/i);
    const toteValue = toteNode.nextSibling;
    expect(toteValue).toHaveTextContent(/2/i);
    expect(toteValue).toHaveTextContent(/paper/i);
  });
});
