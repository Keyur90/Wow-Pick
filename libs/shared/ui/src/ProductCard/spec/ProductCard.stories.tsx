import React from 'react';
import { text, number } from '@storybook/addon-knobs';

import { ProductCard } from '../ProductCard';

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
};

export const ProductCardComponent = () => {
  const title = text('title', "Whittaker's Block Creamy Milk 33% Cocoa 250g");
  const code = number('code', 751892);
  const price = number('price', 6);
  const image = text('image', 'https://cdn0.woolworths.media/content/wowproductimages/medium/266869.jpg');

  return <ProductCard title={title} code={code} price={price} image={image} />;
};
