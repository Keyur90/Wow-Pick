import { Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';
import { Container } from '../Container';

interface FlexBottomActionsPropTypes {
  children: NonNullable<ReactNode>;
  isPrimary?: boolean;
}

const useStyles = makeStyles<Theme, Omit<FlexBottomActionsPropTypes, 'children'>>((theme) => ({
  appBar: {
    top: 'auto',
    bottom: ({ isPrimary }) => theme.spacing(isPrimary ? 0 : 8),
    background: 'none',
    padding: theme.spacing(2, 0),
    boxShadow: 'none',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-evenly',
    gap: theme.spacing(2),
  },
}));

const FlexBottomActions: React.FC<FlexBottomActionsPropTypes> = React.memo(({ children, isPrimary = true }) => {
  const classes = useStyles({ isPrimary });

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Container>
        <div className={classes.content}>{children}</div>
      </Container>
    </AppBar>
  );
});

export { FlexBottomActions };
