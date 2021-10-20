import React, { useState } from 'react';
import { PopUpModal } from '@rf2/ui';

interface ArticleRecalledPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArticleRecalledPopup: React.FC<ArticleRecalledPopupProps> = ({ isOpen, onClose }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText="Product recalled/withdrawn, not for sale"
      headerText="Order"
      closeOrOkText="Close"
    />
  );
};

export { ArticleRecalledPopup };
