import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { Container } from '../Container';

interface BottomActionsPropTypes {
  children: NonNullable<ReactNode>;
  isPrimary?: boolean;
}

const useStyles = makeStyles<Theme, Omit<BottomActionsPropTypes, 'children'>>((theme) => ({
  appBar: {
    top: 'auto',
    bottom: ({ isPrimary }) => theme.spacing(isPrimary ? 0 : 8),
    background: 'none',
    padding: theme.spacing(2, 0),
    boxShadow: 'none',
  },
  content: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(2),
  },
}));

const BottomActions: React.FC<BottomActionsPropTypes> = React.memo(({ children, isPrimary = true }) => {
  const classes = useStyles({ isPrimary });

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Container>
        <div className={classes.content}>{children}</div>
      </Container>
    </AppBar>
  );
});

export { BottomActions };
