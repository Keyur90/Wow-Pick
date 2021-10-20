import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '../Header';

test('renders Header', async () => {
  const { container } = render(
    <Header>
      <h1>Trip summary</h1>
    </Header>
  );

  expect(container).toMatchSnapshot();
});
