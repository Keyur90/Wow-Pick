import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';
import { TotePositionDialog } from '../TotePositionDialog';

describe('TotePositionDialog component', () => {
  const order = {
    id: '140031681',
    packagingType: 'NO BAGS',
    deliveryMethod: 'COLLECT',
    locationCode: 5,
    deliveryDate: '2021-03-18T16:00:00',
    customerName: 'Test customer',
  };

  test('renders TotePositionDialog', async () => {
    const { container } = render(
      <MockedProvider mocks={null} addTypename={false}>
        <TotePositionDialog
          userName={null}
          branchNo={null}
          isOpen={true}
          position={1}
          order={order}
          quantity={3}
          canSkipToteBarcodeScan={true}
          toteBarcode={'40001234001'}
          onSuccessfulScan={() => {
            return null;
          }}
        />
      </MockedProvider>,
      {
        container: document.body,
      }
    );

    //PubSub.publish('DEVICE:ScannedData', '40001234001');

    expect(container).toMatchSnapshot();
  });

  test('renders TotePositionDialog with express trolley', async () => {
    const { container } = render(
      <MockedProvider mocks={null} addTypename={false}>
        <TotePositionDialog
          userName={null}
          branchNo={null}
          isOpen={true}
          canSkipToteBarcodeScan={true}
          position={1}
          order={order}
          quantity={3}
          isExpress={true}
          toteBarcode={'40001234001'}
          onSuccessfulScan={() => {
            return null;
          }}
        />
      </MockedProvider>,
      {
        container: document.body,
      }
    );

    expect(container).toMatchSnapshot();
  });
});
