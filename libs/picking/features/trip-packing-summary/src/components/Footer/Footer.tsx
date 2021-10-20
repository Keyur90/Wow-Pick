import React from 'react';
import { Button, BottomActions } from '@rf2/ui';

interface FooterPropTypes {
  onContinue: () => void;
}

const Footer: React.FC<FooterPropTypes> = ({ onContinue }) => (
  <BottomActions>
    <Button onClick={onContinue}>Continue</Button>
  </BottomActions>
);

export { Footer };
