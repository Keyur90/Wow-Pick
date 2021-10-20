import React from 'react';
import { number } from '@storybook/addon-knobs';

import { FormattedAmount } from '../FormattedAmount';

export default {
  title: 'Components/FormattedAmount',
  component: FormattedAmount,
};

export const FormattedAmountComponent = () => {
  const amount = number('amount', 1000000);

  return <FormattedAmount amount={amount} />;
};
