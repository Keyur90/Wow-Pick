import React from 'react';
import { select, text } from '@storybook/addon-knobs';

import { Badge } from '../Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
};

export const BadgeComponent = () => {
  const content = text('Content', 'Well done');
  const variant = select('Variant', ['blue', 'green', 'red'], 'blue');

  return <Badge variant={variant}>{content}</Badge>;
};
