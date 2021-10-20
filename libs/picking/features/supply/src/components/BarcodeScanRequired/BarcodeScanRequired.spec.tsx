import React from 'react';
import { render } from '@testing-library/react';
import { BarcodeScanRequired } from './BarcodeScanRequired';

test('renders BarcodeScanRequired', () => {
  const { container } = render(<BarcodeScanRequired isOpen={true} onClose={null} />);

  expect(container).toMatchSnapshot();
});
