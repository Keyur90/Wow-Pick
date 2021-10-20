import React from 'react';
import { number } from '@storybook/addon-knobs';

import { TimerProgress } from '../TimerProgress';

export default {
  title: 'Components/TimerProgress',
  component: TimerProgress,
};

export const TimerProgressComponent = () => {
  const startTime = number('startTime', 10);
  const remaining = number('remaining', 4);
  const total = number('total', 10);

  return <TimerProgress startTime={startTime} remaining={remaining} total={total} />;
};
