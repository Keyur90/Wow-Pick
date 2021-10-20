import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TripItemFooter } from './TripItemFooter';

describe('component TripItemFooter', () => {
  const toteItem = {
    id: '28391',
    toteId: '4',
    itemIndex: 0,
    orderNo: '140031681',
    articleId: '28391',
    aisle: '9',
    bay: '56',
    shelf: '2',
    orderedQuantity: 3,
    currentPage: 5,
    stockOnHand: 23,
    totalPages: 20,
    version: '0.0.1',
    price: 4.0,
    secondaryArticleId: '124577',
    personalShopperNotes:
      "Please only make a substitution if you really have too. As these are the best pumpkin cubes I've ever had.",
    suppliedDetails: [],
    article: {
      id: '123123',
      pricingUnit: 'EACH',
      brand: 'Brand',
      description: 'Description',
    },
  };

  test('renders TripItemFooter', () => {
    const { container } = render(
      <TripItemFooter
        onItemPrevious={() => null}
        onItemNext={() => null}
        onShowOrderInformation={() => null}
        canNavigatePrevious={false}
        onToggleView={() => null}
        viewAll={true}
        toteItem={toteItem}
        isWScanEnabled={true}
        onResetCurrentSuppliedItem={null}
        onWScanClick={null}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('has manual scan button', () => {
    const { getByRole } = render(
      <TripItemFooter
        onItemPrevious={() => null}
        onItemNext={() => null}
        onShowOrderInformation={() => null}
        canNavigatePrevious={false}
        onToggleView={() => null}
        viewAll={true}
        toteItem={toteItem}
        isWScanEnabled={true}
        onResetCurrentSuppliedItem={null}
        onWScanClick={null}
      />
    );

    expect(
      getByRole('button', {
        name: /manual scan/i,
      })
    ).toBeInTheDocument();
  });

  test('show more options', async () => {
    const { getByText, findByText } = render(
      <TripItemFooter
        onItemPrevious={() => null}
        onItemNext={() => null}
        onShowOrderInformation={() => null}
        canNavigatePrevious={false}
        onToggleView={() => null}
        viewAll={true}
        toteItem={toteItem}
        isWScanEnabled={true}
        onResetCurrentSuppliedItem={null}
        onWScanClick={null}
      />
    );

    fireEvent(
      getByText(/more options/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(await findByText(/exit trolley trip/i)).toBeInTheDocument();
    expect(await findByText(/change article location/i)).toBeInTheDocument();
    expect(await findByText(/reset current supplied/i)).toBeInTheDocument();
    expect(await findByText(/View unsupplied articles/i)).toBeInTheDocument();
  });
});
