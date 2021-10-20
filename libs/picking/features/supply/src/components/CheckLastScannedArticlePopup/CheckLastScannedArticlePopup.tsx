import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface CheckLastScannedArticlePopup {
  isOpen: boolean;
  onClose: () => void;
}

const CheckLastScannedArticlePopup: React.FC<CheckLastScannedArticlePopup> = ({ isOpen, onClose }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText="Check last item scanned correctly"
      headerText="Please note"
      closeOrOkText="Ok"
    />
  );
};

export { CheckLastScannedArticlePopup };
