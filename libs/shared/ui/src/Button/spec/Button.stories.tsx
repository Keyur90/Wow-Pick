import React from 'react';
import { text } from '@storybook/addon-knobs';

import { Button } from '../Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const PrimaryButtonComponent = () => {
  const buttonText = text('Text', 'Start');

  return <Button onClick={() => null}>{buttonText}</Button>;
};

export const OutlinedPrimaryButtonComponent = () => {
  const buttonText = text('Text', 'Start');

  return (
    <Button variant={'outlined'} onClick={() => null}>
      {buttonText}
    </Button>
  );
};
