import React from 'react';
import { render } from '@testing-library/react';
import { FormattedAmount } from '../FormattedAmount';

test('renders FormattedAmount', () => {
  const { container } = render(<FormattedAmount amount={12345.67} />);

  expect(container).toMatchSnapshot();
});
