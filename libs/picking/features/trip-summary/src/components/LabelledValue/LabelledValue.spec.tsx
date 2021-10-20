import React from 'react';
import { render } from '@testing-library/react';
import { LabelledValue } from './LabelledValue';

test('renders LabelledValue', () => {
  const { container } = render(<LabelledValue label={'Label'} value={'Value'} />);

  expect(container).toMatchSnapshot();
});
