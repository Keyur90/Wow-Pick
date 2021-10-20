import React from 'react';
import { text } from '@storybook/addon-knobs';

import { Header } from '../Header';

export default {
  title: 'Components/Header',
  component: Header,
};

export const HeaderComponent = () => {
  const children = text('children', 'Trip summary');

  return <Header>{children}</Header>;
};
