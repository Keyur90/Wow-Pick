import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface QuantityAboveLimitOverrideNotAllowed {
  isOpen: boolean;
  onClose: () => void;
}

const QuantityAboveLimitOverrideNotAllowed: React.FC<QuantityAboveLimitOverrideNotAllowed> = ({ isOpen, onClose }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText="Article exceeds tolerance - select an alternative"
      headerText="Supplied weight"
      closeOrOkText="Close"
    />
  );
};

export { QuantityAboveLimitOverrideNotAllowed };
