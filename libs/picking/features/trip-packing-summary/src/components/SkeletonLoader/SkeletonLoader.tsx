import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  detailsLoader: {
    marginBottom: theme.spacing(2),
  },
}));

const SkeletonLoader: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="rect" width={'100%'} height={100} className={classes.detailsLoader} />
      <Skeleton variant="rect" width={'100%'} height={62} />
    </>
  );
};

export { SkeletonLoader };
