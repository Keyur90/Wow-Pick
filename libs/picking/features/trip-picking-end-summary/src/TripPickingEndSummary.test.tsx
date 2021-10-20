import { MockedProvider } from '@apollo/client/testing';
import { GET_NEXT_TRIP, UPDATE_ELAPSED_TIME } from '@rf2/picking/data/api';
import { getNextTripMock } from '@rf2/picking/data/mocks';
import { TrolleyType } from '@rf2/shared/utility';
import { render } from '@testing-library/react';
import { TripPickingEndSummary } from './TripPickingEndSummary';

const globalState = {
  userContext: {
    userName: '1759.12',
    branchNo: '1759',
  },
  featureFlags: {
    normalTripEnabled: true,
    canSkipToteBarcodeScan: false,
    showToteDialogForExpress: true,
  },
  trolleyType: TrolleyType.NORMAL,
};

const mockRequest = {
  request: {
    query: GET_NEXT_TRIP,
    variables: {
      userName: '1759.12',
      branchNo: '1759',
      trolleyType: TrolleyType.NORMAL,
    },
  },
};

const mockUpdateElapsedTimeRequest = {
  request: {
    query: UPDATE_ELAPSED_TIME,
    variables: {
      elapsedTimeInput: { trolleyId: '12345', elapsedTime: 10 },
    },
  },
  result: {
    data: {
      elapsedTimeInputResponse: { success: true },
    },
  },
};

const getNextTripMocks = [
  {
    ...getNextTripMock,
    ...mockRequest,
  },
  {
    ...mockUpdateElapsedTimeRequest,
  },
];

describe('component Trip Item', () => {
  test('renders Trip picking end summary', async () => {
    const { findByText } = render(
      <MockedProvider mocks={getNextTripMocks} addTypename={false}>
        <TripPickingEndSummary globalState={globalState} />
      </MockedProvider>
    );

    const incompleteLinesNode = await findByText(/Lines incomplete:/i);
    const noOfLines = incompleteLinesNode.nextSibling;
    expect(noOfLines).toHaveTextContent(/3/i);
    const substitutedLinesNode = await findByText(/Substituted:/i);
    const noOfSubstitutedLines = substitutedLinesNode.nextSibling;
    expect(noOfSubstitutedLines).toHaveTextContent(/0/i);
  });
});
