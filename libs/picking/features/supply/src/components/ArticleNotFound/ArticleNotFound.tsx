import React from 'react';
import { PopUpModal } from '@rf2/ui';

interface ArticleNotFound {
  isOpen: boolean;
  onClose: () => void;
}

const ArticleNotFound: React.FC<ArticleNotFound> = ({ isOpen, onClose }) => {
  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText="Article not found"
      headerText="Barcode Scan"
      closeOrOkText="Close"
    />
  );
};

export { ArticleNotFound };
