import React from 'react';
import { text, number, boolean } from '@storybook/addon-knobs';
import { QuantityField } from '../QuantityField';

export default {
  title: 'Components/QuantityField',
  component: QuantityField,
};

export const QuantityFieldComponent = () => {
  const label = text('label', 'Enter a quantity');
  const defaultValue = number('defaultValue', 10);
  const error = boolean('error', false);
  const errorText = text('errorText', 'Invalid supplied quantity');

  return (
    <QuantityField
      name="quantityField"
      label={label}
      defaultValue={defaultValue}
      onChange={() => null}
      error={error}
      errorText={errorText}
    />
  );
};
