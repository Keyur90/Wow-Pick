import React, { useState } from 'react';
import { PopUpModal } from '@rf2/ui';

interface ChangeTotePopupProps {
  closeOrOkText: string;
  cancelText: string;
  isOpen: boolean;
  onCloseClick: () => void;
  onConfirmClick: () => void;
}

const ChangeTotePopup: React.FC<ChangeTotePopupProps> = ({
  closeOrOkText,
  cancelText,
  isOpen,
  onCloseClick,
  onConfirmClick,
}) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onConfirmClick}
      bodyText="Do you want to change totes? "
      headerText="Label Scan"
      closeOrOkText={closeOrOkText}
      cancelText={cancelText}
      onCancelClick={onCloseClick}
      outlinedButton={true}
    />
  );
};

export { ChangeTotePopup };
