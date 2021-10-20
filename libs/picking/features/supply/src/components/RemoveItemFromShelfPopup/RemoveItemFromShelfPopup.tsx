import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface RemoveItemFromShelfPopupPropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const RemoveItemFromShelfPopup: React.FC<RemoveItemFromShelfPopupPropTypes> = ({ isOpen, onClose }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText="Remove from the shelf. Scan another article"
      headerText="Article Expired"
      closeOrOkText="OK"
    />
  );
};

export { RemoveItemFromShelfPopup };
