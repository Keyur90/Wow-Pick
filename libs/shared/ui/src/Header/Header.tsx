import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { ReactNode } from 'react';

interface HeaderPropsType {
  children?: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    margin: theme.spacing(0, 0, 7),
  },
}));

const useAppBarStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  regular: {
    minHeight: 56,
  },
}));

const Header: React.FC<HeaderPropsType> = ({ children }) => {
  const classes = useStyles();
  const appBarclasses = useAppBarStyles();
  const toolbarClasses = useToolbarStyles();

  return (
    <div className={classes.root}>
      <AppBar classes={appBarclasses} position="fixed">
        <Toolbar classes={toolbarClasses}>{children}</Toolbar>
      </AppBar>
    </div>
  );
};

export { Header };
