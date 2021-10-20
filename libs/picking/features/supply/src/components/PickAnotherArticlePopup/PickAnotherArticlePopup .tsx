import React from 'react';
import { CheckExpiryDatePopup } from '../CheckExpiryDatePopup';

interface PickAnotherArticlePopupPropTypes {
  isOpen: boolean;
  minExpiryDate: string;
  onPickAnotherArticle: () => void;
}

const PickAnotherArticlePopup: React.FC<PickAnotherArticlePopupPropTypes> = ({
  isOpen,
  minExpiryDate,
  onPickAnotherArticle,
}) => {
  return (
    <CheckExpiryDatePopup isOpen={isOpen} minExpiryDate={minExpiryDate} onPickAnotherArticle={onPickAnotherArticle} />
  );
};

export { PickAnotherArticlePopup };
