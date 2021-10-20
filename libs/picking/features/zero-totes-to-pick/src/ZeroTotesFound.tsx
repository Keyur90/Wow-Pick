import { makeStyles } from '@material-ui/core/styles';
import { GlobalState } from '@rf2/shared/global-state';
import React from 'react';
import { NoTotesAvailableToPick } from './components/NoTotesAvailableToPick';

interface ZeroTotesFoundPropTypes {
  globalState: GlobalState;
}

const useStyles = makeStyles((theme) => ({
  content: {
    margin: theme.spacing(7, 0, 0),
  },
}));

const ZeroTotesFound: React.FC<ZeroTotesFoundPropTypes> = ({ globalState }) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <NoTotesAvailableToPick />
    </div>
  );
};

export { ZeroTotesFound };
