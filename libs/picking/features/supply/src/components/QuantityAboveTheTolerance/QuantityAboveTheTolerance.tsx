import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface QuantityAboveTheTolerance {
  isOpen: boolean;
  onNoClick: () => void;
  onYesClick: () => void;
}

const QuantityAboveTheTolerance: React.FC<QuantityAboveTheTolerance> = ({ isOpen, onYesClick, onNoClick }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onYesClick}
      onCancelClick={onNoClick}
      bodyText="Article exceeds tolerance, press Confirm to keep or Close to select an alternative"
      headerText="Supplied weight"
      closeOrOkText="Confirm"
      cancelText="Close"
    />
  );
};

export { QuantityAboveTheTolerance };
