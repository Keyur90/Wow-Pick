import React from 'react';
import { render } from '@testing-library/react';
import { QuantityField } from '../QuantityField';

test('renders QuantityField', async () => {
  const { container } = render(
    <QuantityField
      name="suppliedQuantity"
      label={'Enter the supplied quantity'}
      defaultValue={10}
      onChange={() => null}
      error={false}
      errorText={''}
    />
  );

  expect(container).toMatchSnapshot();
});
