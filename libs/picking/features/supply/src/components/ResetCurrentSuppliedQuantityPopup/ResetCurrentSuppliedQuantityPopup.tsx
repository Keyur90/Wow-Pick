import React, { useState } from 'react';
import { PopUpModal } from '@rf2/ui';

interface ResetCurrentSuppliedQuantityPopupProps {
  isOpen: boolean;
  onCloseClick: () => void;
  onConfirmClick: () => void;
}

const ResetCurrentSuppliedQuantityPopup: React.FC<ResetCurrentSuppliedQuantityPopupProps> = ({
  isOpen,
  onCloseClick,
  onConfirmClick,
}) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onConfirmClick}
      bodyText="Are you sure you want to reset the supplied quantity back to zero? "
      headerText="Reset Current Supplied"
      closeOrOkText="CONFIRM"
      cancelText="CANCEL"
      onCancelClick={onCloseClick}
    />
  );
};

export { ResetCurrentSuppliedQuantityPopup };
