import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface QuantitySuppliedPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuantitySuppliedPopup: React.FC<QuantitySuppliedPopupProps> = ({ isOpen, onClose }) => (
  <PopUpModal
    isOpen={isOpen}
    onOkClick={onClose}
    bodyText="Article maximum qty already supplied"
    headerText="Supplied Quantity"
    closeOrOkText="Close"
  />
);

export { QuantitySuppliedPopup };
