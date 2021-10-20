import { MockedProvider } from '@apollo/client/testing';
import { UPDATE_FREE_SAMPLE_SUPPLIED } from '@rf2/picking/data/api';
import { getNextTripMock } from '@rf2/picking/data/mocks';
import { TrolleyType } from '@rf2/shared/utility';
import { render } from '@testing-library/react';
import React from 'react';
import { TripSampleContent } from './TripSampleContent';

const { id: trolleyId, freeSamples, orders, totes, isExpress } = getNextTripMock.result.data.getNextTrip;
const mockRequest = {
  request: {
    query: UPDATE_FREE_SAMPLE_SUPPLIED,
    variables: {
      userName: '1759.12',
      branchNo: '1759',
      trolleyId: '1234',
      suppliedCollectibleInput: null,
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

describe('component TripSampleContent', () => {
  test('renders TripItemFooter', async () => {
    const { findByText, getByLabelText } = render(
      <MockedProvider mocks={getNextTripMocks} addTypename={false}>
        <TripSampleContent
          globalState={globalState}
          trolleyId={trolleyId}
          freeSample={freeSamples[0]}
          tote={totes[1]}
          order={orders[1]}
          onComplete={() => null}
          isExpress={isExpress}
        />
      </MockedProvider>
    );

    expect(await findByText(/Welcome pack sampling 2 while stocks last/i)).toBeInTheDocument();
  });
});
