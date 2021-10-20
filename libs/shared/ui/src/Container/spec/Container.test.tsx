import React from 'react';
import { render } from '@testing-library/react';
import { Container } from '../Container';

test('renders Container', () => {
  const { container } = render(<Container>Some content</Container>);

  expect(container).toMatchSnapshot();
});
