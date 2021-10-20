import React from 'react';
import { render } from '@testing-library/react';
import { Loader } from '../Loader';

test('renders Loader', async () => {
  const { container } = render(<Loader isLoading={true} />);

  expect(container).toMatchSnapshot();
});
