import { PackagingTypes } from '@rf2/shared/utility';
import { boolean, number, select } from '@storybook/addon-knobs';
import React from 'react';
import { TotePositionDialog } from '../TotePositionDialog';

export default {
  title: 'Components/TotePositionDialog',
  component: TotePositionDialog,
};

export const TotePositionDialogComponent = () => {
  const isOpen = boolean('isOpen', false);
  const position = number('position', 1);
  const bagType = select(
    'bagType',
    [PackagingTypes.PLASTIC, PackagingTypes.PAPER, PackagingTypes.NO_BAGS],
    PackagingTypes.PLASTIC
  );
  const quantity = number('quantity', 3);
  const isExpress = boolean('isExpress', false);

  const order = {
    id: '140031681',
    packagingType: 'NO BAGS',
    deliveryMethod: 'COLLECT',
    locationCode: 5,
    deliveryDate: '2021-03-18T16:00:00',
    customerName: 'Test customer',
  };

  return (
    <TotePositionDialog
      toteBarcode={'123124'}
      isOpen={isOpen}
      position={position}
      order={order}
      quantity={quantity}
      isExpress={isExpress}
      canSkipToteBarcodeScan={true}
      onSuccessfulScan={null}
      userName={'1759.12'}
      branchNo={'1759'}
    />
  );
};
