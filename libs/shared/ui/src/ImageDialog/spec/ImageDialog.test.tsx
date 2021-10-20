import React from 'react';
import { render } from '@testing-library/react';
import { ImageDialog } from '../ImageDialog';

test('renders ImageDialog', async () => {
  const { container } = render(
    <ImageDialog
      isOpen={true}
      onToggle={() => null}
      imageUrl={'https://cdn0.woolworths.media/content/wowproductimages/medium/266869.jpg'}
    />,
    {
      container: document.body,
    }
  );

  expect(container).toMatchSnapshot();
});
