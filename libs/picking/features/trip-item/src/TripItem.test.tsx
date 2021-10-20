import { MockedProvider } from '@apollo/client/testing';
import { GET_NEXT_TRIP, GET_PEG_CONFIGS, UPDATE_ELAPSED_TIME } from '@rf2/picking/data/api';
import { getNextTripMock } from '@rf2/picking/data/mocks';
import { mockPEBConfigs, TrolleyType } from '@rf2/shared/utility';
import { fireEvent, render, screen } from '@testing-library/react';
import { TripItem } from './TripItem';

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

const mockPEBRequest = {
  request: {
    query: GET_PEG_CONFIGS,
    variables: {
      allConfigs: 'false',
    },
  },
  result: {
    data: {
      getPEBConfigs: mockPEBConfigs.map((i) => {
        return { ...i, __typename: 'PEBConfig' };
      }),
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
    ...mockPEBRequest,
  },
  {
    ...mockUpdateElapsedTimeRequest,
  },
];

describe('component Trip Item', () => {
  test('renders Trip Item', async () => {
    const { findByText } = render(
      <MockedProvider mocks={getNextTripMocks} addTypename={false}>
        <TripItem globalState={globalState} />
      </MockedProvider>
    );

    const aisleNode = await findByText(/A9/i);
    const shelfNode = await findByText(/S2/i);
    const bayNode = await findByText(/B56/i);
    expect(aisleNode).toBeInTheDocument();
    expect(shelfNode).toBeInTheDocument();
    expect(bayNode).toBeInTheDocument();
    expect(await findByText('12/20')).toBeVisible();
    expect(await findByText('left in trip')).toBeVisible();
  });

  test('Back button must be disabled if its the first item in trip', async () => {
    const { getByText, findByText } = render(
      <MockedProvider mocks={getNextTripMocks} addTypename={false}>
        <TripItem globalState={globalState} />
      </MockedProvider>
    );
    expect(await findByText('2/2')).toBeVisible();
    expect(getByText(/BACK/i).closest('button')).toBeDisabled();
  });

  test('FWD button should navigate to next item and update trips status', async () => {
    const { getByText, findByText } = render(
      <MockedProvider mocks={getNextTripMocks} addTypename={false}>
        <TripItem globalState={globalState} />
      </MockedProvider>
    );

    const tripStatusBeforeForwardClick = await findByText('2/2');
    expect(tripStatusBeforeForwardClick).toBeInTheDocument();

    fireEvent.click(screen.getByText(/FWD/i));
    const items = await findByText(/left in trip/);
    const tripStatusAfterForwardClick = await findByText('1/2');
    expect(items).toBeInTheDocument();

    expect(tripStatusAfterForwardClick).toBeInTheDocument();
    expect(getByText(/BACK/i).closest('button').disabled).toEqual(false);
  });
});
