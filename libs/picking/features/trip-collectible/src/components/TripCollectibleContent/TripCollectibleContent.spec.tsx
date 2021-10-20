import { MockedProvider } from '@apollo/client/testing';
import { UPDATE_SUPPLIED_COLLECTIBLES } from '@rf2/picking/data/api';
import { getNextTripMock } from '@rf2/picking/data/mocks';
import { TrolleyType } from '@rf2/shared/utility';
import { render } from '@testing-library/react';
import React from 'react';
import { TripCollectibleContent } from './TripCollectibleContent';

const { collectibles, orders, totes, id: trolleyId, isExpress } = getNextTripMock.result.data.getNextTrip;

const mockRequest = {
  request: {
    query: UPDATE_SUPPLIED_COLLECTIBLES,
    variables: {
      userName: '1759.12',
      branchNo: '1759',
      trolleyId: '1234',
    },
  },
};

const getNextTripMocks = [
  {
    ...getNextTripMock,
    ...mockRequest,
  },
];

const globalState = {
  userContext: { userName: '1759.12', branchNo: '1759' },
  featureFlags: { canSkipToteBarcodeScan: true },
  trolleyType: TrolleyType.NORMAL,
};

describe('component TripCollectibleContent', () => {
  test('renders TripItemFooter', async () => {
    const { findByText, getByLabelText } = render(
      <MockedProvider mocks={getNextTripMocks} addTypename={false}>
        <TripCollectibleContent
          globalState={globalState}
          collectible={collectibles[0]}
          tote={totes[1]}
          order={orders[1]}
          onComplete={() => null}
          isExpress={isExpress}
          trolleyId={trolleyId}
        />
      </MockedProvider>
    );

    expect(await findByText(/woolworths disney collectibles/i)).toBeInTheDocument();
    expect(getByLabelText('Enter the supplied quantity')).toHaveValue('2');
  });
});
