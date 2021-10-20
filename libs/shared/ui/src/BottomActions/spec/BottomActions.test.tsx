import React from 'react';
import { render } from '@testing-library/react';
import { BottomActions } from '../BottomActions';

test('renders BottomActions', () => {
  const { container } = render(<BottomActions>Some bottom actions</BottomActions>, {
    container: document.body,
  });

  expect(container).toMatchSnapshot();
});
