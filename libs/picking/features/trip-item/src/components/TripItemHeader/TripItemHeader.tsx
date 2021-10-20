import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GetNextTrip, ToteItem } from '@rf2/picking/data/api-contracts';
import React from 'react';
import { SuppliedStatus } from './SuppliedStatus';
import { TripStatus } from './TripStatus';

interface TripItemHeaderPropTypes {
  tripData: GetNextTrip;
  toteItem: ToteItem;
  toteItemIndex: number;
  totalItems: number;
  viewAll: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  primaryContent: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '1.75rem',
    lineHeight: '2rem',
  },
  titleSeparator: {
    color: theme.palette.common.white,
    opacity: 0.6,
    margin: theme.spacing(0, 0.5),
  },
}));

const TripItemHeader: React.FC<TripItemHeaderPropTypes> = ({
  tripData,
  toteItem,
  toteItemIndex,
  totalItems,
  viewAll,
}) => {
  const classes = useStyles();
  const { aisle, bay, shelf, currentPage, totalPages } = toteItem;

  return (
    <div className={classes.root}>
      <div className={classes.primaryContent}>
        <Typography variant="h1" component="h1" className={classes.title}>
          A{aisle ?? '0'}
          <span className={classes.titleSeparator}>-</span>B{bay ?? '0'}
          <span className={classes.titleSeparator}>-</span> S{shelf ?? '99'}
        </Typography>

        <SuppliedStatus totalPages={totalPages} currentPage={currentPage} viewAll={viewAll} />
      </div>
      <div>
        <TripStatus tripData={tripData} toteItemIndex={toteItemIndex} totalItems={totalItems} />
      </div>
    </div>
  );
};

export { TripItemHeader };
