import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface QuantityBelowLimit {
  isOpen: boolean;
  onClose: () => void;
}

const QuantityBelowLimit: React.FC<QuantityBelowLimit> = ({ isOpen, onClose }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText="Article is below the limit - select an alternative"
      headerText="Supplied weight"
      closeOrOkText="Close"
    />
  );
};

export { QuantityBelowLimit };
