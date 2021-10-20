import React from 'react';
import { render } from '@testing-library/react';
import { IncorrectLabelScan } from '../IncorrectLabelScan';

test('renders IncorrectLabelScan message', () => {
  const { container } = render(<IncorrectLabelScan isOpen={true} onClose={null} />);

  expect(container).toMatchSnapshot();
});
