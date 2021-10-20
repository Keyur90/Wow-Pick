import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

interface TrafficLightPropTypes {
  status: string;
}

interface StyledProps {
  backgroundColor: string;
}

const useStyles = makeStyles<Theme, StyledProps>((theme) => ({
  root: {
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    display: 'block',
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.common.white}`,
  },
}));

const TrafficLight: React.FC<TrafficLightPropTypes> = ({ status }) => {
  const classes = useStyles({ backgroundColor: status });
  return <span className={classes.root}></span>;
};

export { TrafficLight };
