import React from 'react';
import { render } from '@testing-library/react';
import { ActionDrawer } from '../ActionDrawer';

test('renders ActionDrawer', () => {
  const { container } = render(
    <ActionDrawer isOpen={true} onToggle={() => null}>
      Some actions
    </ActionDrawer>,
    {
      container: document.body,
    }
  );

  expect(container).toMatchSnapshot();
});
