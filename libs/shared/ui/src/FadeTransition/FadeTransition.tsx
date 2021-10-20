import React from 'react';
import Fade from '@material-ui/core/Fade';
import { TransitionProps } from '@material-ui/core/transitions';

const FadeTransition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  const newProps = { ...props, timeout: { enter: 500, exit: 0 } };
  return <Fade ref={ref} {...newProps} />;
});

export { FadeTransition };
