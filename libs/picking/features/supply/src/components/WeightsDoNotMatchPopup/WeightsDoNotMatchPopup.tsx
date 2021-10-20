import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface WeightsDoNotMatchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WeightsDoNotMatchPopup: React.FC<WeightsDoNotMatchPopupProps> = ({ isOpen, onClose }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText="Weights do not match, press OK to start again"
      headerText="Order"
      closeOrOkText="OK"
    />
  );
};

export { WeightsDoNotMatchPopup };
