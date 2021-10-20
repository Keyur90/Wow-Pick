import React from 'react';
import NumberFormat from 'react-number-format';

interface FormattedAmountPropTypes {
  amount: number;
}

const FormattedAmount: React.FC<FormattedAmountPropTypes> = ({ amount }) => (
  <NumberFormat
    value={amount}
    displayType={'text'}
    thousandSeparator={true}
    decimalScale={2}
    fixedDecimalScale={true}
    prefix={'$'}
  />
);

export { FormattedAmount };
