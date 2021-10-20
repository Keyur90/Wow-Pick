import React, { ReactNode } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface BadgePropTypes {
  children: NonNullable<ReactNode>;
  backgroundColor: string;
}

interface StyledProps {
  backgroundColor: string;
}

const useStyles = makeStyles<Theme, StyledProps>((theme) => ({
  root: {
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    fontFamily: theme.typography.body1.fontFamily,
    display: 'inline-flex',
    alignItems: 'center',
  },
}));

const Badge: React.FC<BadgePropTypes> = ({ children, backgroundColor }) => {
  const classes = useStyles({ backgroundColor: backgroundColor });

  return <span className={classes.root}>{children}</span>;
};

export { Badge };
