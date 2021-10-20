import { makeStyles } from '@material-ui/core/styles';
import { useElapsedTime } from '@rf2/picking/data/api';
import { GetNextTrip } from '@rf2/picking/data/api-contracts';
import { useTrafficLightStatus } from '@rf2/shared/utility';
import { Badge } from '@rf2/ui';
import React from 'react';
import { TrafficLight } from './TrafficLight';
interface TripStatusPropTypes {
  tripData: GetNextTrip;
  toteItemIndex: number;
  totalItems: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0.75, 1),
    textAlign: 'center',
  },
  primaryStatusContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryStatusText: {
    marginLeft: theme.spacing(0.5),
    fontSize: '0.875rem',
    lineHeight: '1rem',
    fontWeight: 500,
  },
  secondaryStatusText: {
    fontSize: '0.75rem',
    lineHeight: '0.875rem',
    letterSpacing: '0.12px',
    opacity: 0.8,
  },
}));

const TripStatus: React.FC<TripStatusPropTypes> = ({ toteItemIndex, totalItems, tripData }) => {
  const classes = useStyles();
  const { trafficLightStatus } = useTrafficLightStatus(tripData?.goalTime, tripData?.elapsedTime);
  useElapsedTime(tripData);

  return (
    <Badge backgroundColor={'#167E3E'}>
      <span className={classes.root}>
        <span className={classes.primaryStatusContainer}>
          <TrafficLight status={trafficLightStatus} />
          <span className={classes.primaryStatusText}>
            {toteItemIndex}/{totalItems}
          </span>
        </span>
        <span className={classes.secondaryStatusText}>left in trip</span>
      </span>
    </Badge>
  );
};

export { TripStatus };
