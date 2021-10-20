import React from 'react';
import { CheckExpiryDatePopup } from '../CheckExpiryDatePopup';

interface PickAnotherOrProceedWithCurrentArticlePopupPropTypes {
  isOpen: boolean;
  preferredExpiryDate: string;
  minExpiryDate: string;
  onPickAnotherArticle: () => void;
  onProceedWithCurrentArticle: () => void;
}

const PickAnotherOrProceedWithCurrentArticlePopup: React.FC<PickAnotherOrProceedWithCurrentArticlePopupPropTypes> = ({
  isOpen,
  preferredExpiryDate,
  minExpiryDate,
  onPickAnotherArticle,
  onProceedWithCurrentArticle,
}) => {
  return (
    <CheckExpiryDatePopup
      isOpen={isOpen}
      preferredExpiryDate={preferredExpiryDate}
      minExpiryDate={minExpiryDate}
      onPickAnotherArticle={onPickAnotherArticle}
      onProceedWithCurrentArticle={onProceedWithCurrentArticle}
    />
  );
};

export { PickAnotherOrProceedWithCurrentArticlePopup };
