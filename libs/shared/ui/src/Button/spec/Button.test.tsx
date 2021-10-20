import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../Button';

test('renders Primary Button', () => {
  const { container } = render(<Button onClick={() => null}>Start</Button>);

  expect(container).toMatchSnapshot();
});

test('renders Outlined Primary Button', () => {
  const { container, getByText } = render(<Button onClick={() => null}>Start</Button>);

  expect(container).toMatchSnapshot();
});
