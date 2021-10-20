import { PopUpModal } from '@rf2/ui';
import React from 'react';

interface NoPrinterAvailableProps {
  printerId: string;
  onClose: () => void;
}

const NoPrinterAvailablePopup: React.FC<NoPrinterAvailableProps> = ({ printerId, onClose }) => (
  <PopUpModal
    isOpen={true}
    onOkClick={onClose}
    bodyText={`No printer available in the location "${printerId}"`}
    headerText="Printer Not Available"
    closeOrOkText="CLOSE"
  />
);

export { NoPrinterAvailablePopup };
