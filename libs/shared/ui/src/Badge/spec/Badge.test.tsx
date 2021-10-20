import React from 'react';
import { render } from '@testing-library/react';
import { Badge } from '../Badge';

test('renders Badge', () => {
  const { container } = render(<Badge variant="red">Well done!</Badge>, {
    container: document.body,
  });

  expect(container).toMatchSnapshot();
});
