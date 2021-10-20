import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import { Loader } from '../Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
};

export const LoaderComponent = () => {
  const isLoading = boolean('isLoading', true);

  return <Loader isLoading={isLoading} />;
};
