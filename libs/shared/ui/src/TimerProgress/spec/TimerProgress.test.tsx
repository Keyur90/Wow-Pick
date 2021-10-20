import React from 'react';
import { render } from '@testing-library/react';
import { TimerProgress } from '../TimerProgress';

test('renders TimerProgress', async () => {
  const { container } = render(<TimerProgress startTime={10} remaining={4} total={10} />);

  expect(container).toMatchSnapshot();
});
