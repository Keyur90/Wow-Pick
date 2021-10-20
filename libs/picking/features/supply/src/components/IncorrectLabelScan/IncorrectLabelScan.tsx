import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface IncorrectLabelScan {
  isOpen: boolean;
  onClose: () => void;
}

const IncorrectLabelScan: React.FC<IncorrectLabelScan> = ({ isOpen, onClose }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText="Incorrect label scanned"
      headerText="Label Scan"
      closeOrOkText="Close"
    />
  );
};

export { IncorrectLabelScan };
