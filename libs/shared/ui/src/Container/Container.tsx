import React, { ReactNode } from 'react';
import { Container as MuiContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ContainerPropTypes {
  children: NonNullable<ReactNode>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2),
  },
}));

const Container: React.FC<ContainerPropTypes> = ({ children }) => {
  const classes = useStyles();

  return <MuiContainer classes={classes}>{children}</MuiContainer>;
};

export { Container };
