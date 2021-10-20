import { PopUpModal } from '@rf2/ui';
import React from 'react';

interface IncorrectLabelScanProps {
  onClose: () => void;
}

const IncorrectLabelScanPopup: React.FC<IncorrectLabelScanProps> = ({ onClose }) => (
  <PopUpModal
    isOpen={true}
    onOkClick={onClose}
    bodyText={'Incorrect printer pool label scanned'}
    headerText="Label Scan"
    closeOrOkText="CLOSE"
  />
);

export { IncorrectLabelScanPopup };
