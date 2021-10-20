import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface ExtraToteLabelsPopupProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ExtraToteLabelsPopup: React.FC<ExtraToteLabelsPopupProps> = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onConfirm}
      onCancelClick={onCancel}
      headerText="Extra labels"
      bodyText="Do you need extra tote labels?"
      closeOrOkText="Yes"
      cancelText="No"
      outlinedButton
    />
  );
};

export { ExtraToteLabelsPopup };
