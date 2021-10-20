import React from 'react';
import { render } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

test('renders ProductCard', async () => {
  const { container } = render(
    <ProductCard
      title={"Whittaker's Block Creamy Milk 33% Cocoa 250g"}
      code={751892}
      price={6.0}
      image={'https://cdn0.woolworths.media/content/wowproductimages/medium/266869.jpg'}
    />
  );

  expect(container).toMatchSnapshot();
});
