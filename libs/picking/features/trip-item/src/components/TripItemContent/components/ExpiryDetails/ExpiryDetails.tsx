import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@rf2/ui';
import { trim as _trim, capitalize as _capitalize } from 'lodash';
import { calculateShelfLifeExpiryDate } from '@rf2/shared/utility';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(1.5, 0),
    background: theme.palette.common.white,
    borderBottom: '1px solid #E0E0E0',
    marginBottom: theme.spacing(1),
  },
  details: {
    display: 'flex',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: '1rem',
    lineHeight: '1rem',
    fontWeight: 400,
  },
  detailsTextDate: {
    color: theme.palette.primary.dark,
    fontWeight: 700,
  },
}));

const ShelfLife = {
  MINIMUM: 'MINIMUM',
  PREFERRED: 'PREFERRED',
  DEFAULT: 'DEFAULT',
};

interface ExpiryDetailsPropTypes {
  preferredShelfLife: number;
  minShelfLife: number;
  deliveryDate: string;
  defaultShelfLife: number;
}

const ExpiryDetails: React.FC<ExpiryDetailsPropTypes> = ({
  deliveryDate,
  preferredShelfLife,
  minShelfLife,
  defaultShelfLife,
}) => {
  const classes = useStyles();
  const preferredDates = calculateShelfLifeExpiryDate(preferredShelfLife, minShelfLife, deliveryDate, defaultShelfLife);

  return (
    <div className={classes.content}>
      <Container>
        <div className={classes.details}>
          {!!preferredShelfLife && preferredShelfLife !== minShelfLife ? (
            <Typography className={classes.detailsText} component="span">
              Expiring <span className={classes.detailsTextDate}>{preferredDates?.preferredExpiryDate}</span> or later
              (Min. expiry {preferredDates?.minExpiryDate})
            </Typography>
          ) : minShelfLife ? (
            <Typography className={classes.detailsText} component="span">
              Min. Expiry <span className={classes.detailsTextDate}>{preferredDates?.minExpiryDate}</span> or later
            </Typography>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export { ExpiryDetails };
