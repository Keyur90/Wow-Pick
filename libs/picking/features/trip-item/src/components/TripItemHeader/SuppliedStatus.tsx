import { makeStyles } from '@material-ui/core/styles';
import { Badge } from '@rf2/ui';
import React from 'react';

interface SuppliedStatusPropTypes {
  currentPage: number;
  totalPages: number;
  viewAll: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 0, 0, 1.5),
  },
  statusText: {
    fontSize: '0.875rem',
    lineHeight: '1rem',
    padding: theme.spacing(0.25, 1),
    fontWeight: 500,
    textAlign: 'center',
  },
  viewModeText: {
    fontSize: '0.75rem',
    opacity: '0.8',
    lineHeight: '1rem',
  },
}));

const SuppliedStatus: React.FC<SuppliedStatusPropTypes> = ({ currentPage, totalPages, viewAll }) => {
  const classes = useStyles();
  const hasPagination = currentPage !== null && totalPages !== null;
  return viewAll || hasPagination ? (
    <div className={classes.root}>
      <Badge backgroundColor={'#125430'}>
        <span className={classes.statusText}>
          {hasPagination && (
            <>
              {currentPage}/{totalPages}
            </>
          )}
          {viewAll && (
            <>
              <br />
              <span className={classes.viewModeText}>All</span>
            </>
          )}
        </span>
      </Badge>
    </div>
  ) : null;
};

export { SuppliedStatus };
