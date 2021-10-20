import React, { useState } from 'react';
import { PopUpModal } from '@rf2/ui';

interface BarcodeScanRequiredProps {
  isOpen: boolean;
  onClose: () => void;
}

const BarcodeScanRequired: React.FC<BarcodeScanRequiredProps> = ({ isOpen, onClose }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText="Barcode scan required before won’t scan is enabled, please scan…"
      headerText="Won't Scan"
      closeOrOkText="Close"
    />
  );
};

export { BarcodeScanRequired };
