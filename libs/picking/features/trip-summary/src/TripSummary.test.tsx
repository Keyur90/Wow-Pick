import { MockedProvider } from '@apollo/client/testing';
import { GET_NEXT_TRIP, UPDATE_ELAPSED_TIME } from '@rf2/picking/data/api';
import { getNextTripBulkMock, getNextTripExpressMock, getNextTripMock } from '@rf2/picking/data/mocks';
import { TrolleyType } from '@rf2/shared/utility';
import { render } from '@testing-library/react';
import React from 'react';
import { TripSummary } from './TripSummary';

const globalState = {
  userContext: {
    userName: '1759.12',
    branchNo: '1759',
  },
  featureFlags: null,
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

const getNextTripExpressMocks = [
  {
    ...getNextTripExpressMock,
    ...mockRequest,
  },
  {
    ...mockUpdateElapsedTimeRequest,
  },
];

const getNextTripBulkMocks = [
  {
    ...getNextTripBulkMock,
    ...mockRequest,
  },
  {
    ...mockUpdateElapsedTimeRequest,
  },
];

describe('component TripSummary', () => {
  test('renders TripSummary', async () => {
    const { findByText, getByText } = render(
      <MockedProvider mocks={getNextTripMocks} addTypename={false}>
        <TripSummary globalState={globalState} />
      </MockedProvider>
    );

    expect(getByText(/trip summary/i)).toBeInTheDocument();
    const toteNode = await findByText(/totes:/i);
    expect(toteNode).toBeInTheDocument();
    const toteNodeValue = toteNode.nextSibling;
    expect(toteNodeValue).toHaveTextContent(/2/i);

    const goalTimeNode = await findByText(/goal time:/i);
    expect(goalTimeNode).toBeInTheDocument();
    const goalTimeNodeValue = goalTimeNode.nextSibling;
    expect(goalTimeNodeValue).toHaveTextContent(/1 hour 2 minutes/i);
  });

  test('renders TripSummary express trip', async () => {
    const { findByText, getByText } = render(
      <MockedProvider mocks={getNextTripExpressMocks} addTypename={false}>
        <TripSummary globalState={globalState} />
      </MockedProvider>
    );

    expect(getByText(/trip summary/i)).toBeInTheDocument();
    expect(await findByText(/No tote labels needed/i)).toBeInTheDocument();
    expect(await findByText(/plastic/i)).toBeInTheDocument();
  });

  test('renders TripSummary bulk trip', async () => {
    const { findByText, getByText } = render(
      <MockedProvider mocks={getNextTripBulkMocks} addTypename={false}>
        <TripSummary globalState={globalState} />
      </MockedProvider>
    );

    expect(getByText(/trip summary/i)).toBeInTheDocument();
    expect(await findByText(/bulk trolley trip/i)).toBeInTheDocument();
  });
});
