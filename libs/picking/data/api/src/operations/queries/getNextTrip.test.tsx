import { MockedProvider } from '@apollo/client/testing';
import { getNextTripMock } from '@rf2/picking/data/mocks';
import { TrolleyType } from '@rf2/shared/utility';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { GET_NEXT_TRIP, useGetNextTrip } from './';

const mocks = [
  {
    ...getNextTripMock,
    ...{
      request: {
        query: GET_NEXT_TRIP,
        variables: {
          userName: '1759.12',
          branchNo: '1759',
          trolleyType: TrolleyType.NORMAL,
        },
      },
    },
  },
];

describe('useGetNextTrip', () => {
  it('getNextTrip query', async () => {
    // eslint-disable-next-line
    const wrapper = ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useGetNextTrip('1759.12', '1759', TrolleyType.NORMAL), {
      wrapper,
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data.id).toEqual('12345');
  });
});
