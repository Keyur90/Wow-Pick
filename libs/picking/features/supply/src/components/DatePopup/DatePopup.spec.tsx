import React from 'react';
import { render } from '@testing-library/react';
import { DatePopup } from './DatePopup';

test('renders ExpiryDatePopup', () => {
  const { baseElement } = render(<DatePopup date={null} isOpen={true} onOk={null} onClose={null} onChange={null} />);

  expect(baseElement).toMatchSnapshot();
});
