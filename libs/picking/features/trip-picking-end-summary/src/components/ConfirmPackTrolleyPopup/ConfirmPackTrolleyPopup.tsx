import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface ConfirmPackTrolleyPopupProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmPackTrolleyPopup: React.FC<ConfirmPackTrolleyPopupProps> = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onConfirm}
      onCancelClick={onCancel}
      headerText="Unsupplied items"
      bodyText="There are unsupplied items. Do you want to continue?"
      closeOrOkText="Yes"
      cancelText="No"
      outlinedButton
    />
  );
};

export { ConfirmPackTrolleyPopup };
