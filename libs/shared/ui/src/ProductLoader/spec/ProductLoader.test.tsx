import React from 'react';
import { render } from '@testing-library/react';
import { ProductLoader } from '../ProductLoader';

test('renders ProductLoader', async () => {
  const { container } = render(<ProductLoader />);

  expect(container).toMatchSnapshot();
});
