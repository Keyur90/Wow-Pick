import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';
import { WontScan } from './WontScan';

test('renders WontScan', () => {
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
    totalSuppliedQuantity: 0,
    article: {
      id: '123123',
      pricingUnit: 'EACH',
      brand: 'Brand',
      description: 'Description',
    },
  };
  const { baseElement } = render(
    <MockedProvider mocks={null} addTypename={false}>
      <WontScan onConfirm={() => null} onClose={() => null} toteItem={toteItem} />
    </MockedProvider>
  );

  expect(baseElement).toMatchSnapshot();
});
