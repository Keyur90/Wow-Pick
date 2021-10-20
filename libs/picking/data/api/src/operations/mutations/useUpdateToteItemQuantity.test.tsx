import { MockedProvider } from '@apollo/client/testing';
import {
  updateSuppliedQuantityErrorResultMock,
  updateSuppliedQuantitySuccessResultMock,
} from '@rf2/picking/data/mocks';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { UPDATE_SUPPLIED_QUANTITY, useUpdateToteItemQuantity } from './useUpdateToteItemQuantity';

const mocks = [
  {
    ...updateSuppliedQuantitySuccessResultMock,
    ...{
      request: {
        query: UPDATE_SUPPLIED_QUANTITY,
        variables: {
          updates: [
            {
              userName: '1759.12',
              branchNo: '1759',
              id: '28391',
              suppliedDetails: [
                {
                  type: 'primary',
                  articleId: '12345',
                  quantity: 3,
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    ...updateSuppliedQuantityErrorResultMock,
    ...{
      request: {
        query: UPDATE_SUPPLIED_QUANTITY,
        variables: {
          updates: [
            {
              userName: '1759.12',
              branchNo: '1759',
              id: '28391',
              suppliedDetails: [
                {
                  type: 'primary',
                  articleId: '12345',
                  quantity: 3,
                },
              ],
            },
          ],
        },
      },
    },
  },
];

describe('useUpdateSuppliedQuantity', () => {
  it('updateSuppliedQuantity successfully mutates supplied info', async () => {
    // eslint-disable-next-line
    const wrapper = ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitFor } = renderHook(
      () => {
        return useUpdateToteItemQuantity();
      },
      {
        wrapper,
      }
    );
    expect(result.current).toBeTruthy();

    await act(async () => {
      const { mutate } = result.current;

      const { data, errors } = await mutate({
        variables: mocks[0].request.variables,
      });

      expect(data.updateSuppliedQuantity.success).toBe(true);
      expect(errors).toBeFalsy;
    });
  });

  it('updateSuppliedQuantity toteItemId not found', async () => {
    // eslint-disable-next-line
    const wrapper = ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitFor } = renderHook(
      () => {
        return useUpdateToteItemQuantity();
      },
      {
        wrapper,
      }
    );

    expect(result.current).toBeTruthy();

    await act(async () => {
      try {
        const { mutate } = result.current;

        const { data, errors } = await mutate({ variables: mocks[1].request.variables });
      } catch (error) {
        expect(result.current.error).toBeTruthy;
        expect(result.current.error.message).toBe('toteItem not found');
      }
    });
  });
});
