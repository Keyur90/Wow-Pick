import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  cardLoader: {
    marginBottom: theme.spacing(2),
    borderRadius: 0,
  },
  detailLoader: {
    borderRadius: 0,
  },
}));

const ProductLoader: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="rect" width={'100%'} height={166} className={classes.cardLoader} />
      <Skeleton variant="rect" width={'100%'} height={54} className={classes.detailLoader} />
    </>
  );
};

export { ProductLoader };
