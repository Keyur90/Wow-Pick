import { returnToLegacyTrolleyMain } from '@rf2/shared/utility';
import { PopUpModal } from '@rf2/ui';
import React from 'react';

// interface NoTotesAvailableToPickProps {
// }

const NoTotesAvailableToPick: React.FC = () => (
  <PopUpModal
    isOpen={true}
    onOkClick={() => returnToLegacyTrolleyMain()}
    bodyText="No more totes found to pick"
    headerText="Next Trolley Trip"
    closeOrOkText="CLOSE"
  />
);

export { NoTotesAvailableToPick };
