import React from 'react';
import { startCase as _startCase } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, BagStatus } from '@rf2/ui';
import { textDuration } from '@rf2/shared/utility';
import { LabelIcon, ToteIcon, TimerIcon } from '@rf2/shared/icons';
import { LabelledValue } from '../LabelledValue';

interface SummaryContentPropTypes {
  isExpressTrip: boolean;
  isBulkTrip: boolean;
  totes: number;
  articles: number;
  labels: number;
  goalTime: number;
  bagType?: string;
}

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    backgroundColor: theme.palette.common.white,
  },
  bagType: {
    fontSize: '1rem',
  },
}));

const SummaryContent: React.FC<SummaryContentPropTypes> = ({
  isExpressTrip,
  isBulkTrip,
  totes,
  articles,
  labels,
  goalTime,
  bagType,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.containerWrapper}>
        <List>
          {isBulkTrip && <ListItem>Bulk Trolley Trip</ListItem>}
          {!isExpressTrip && (
            <>
              <ListItem>
                <ToteIcon />
                <LabelledValue label="Totes" value={totes} />
                <LabelledValue label="Articles" value={articles} />
              </ListItem>
              <ListItem>
                <LabelIcon />
                <LabelledValue label="Labels" value={labels} />
              </ListItem>
            </>
          )}
          {isExpressTrip && (
            <>
              <ListItem>
                <LabelledValue label="Articles" value={articles} />
              </ListItem>
              <ListItem>No tote labels needed</ListItem>
              <ListItem>
                <LabelledValue
                  label="Bag type"
                  value={
                    <span className={classes.bagType}>
                      <BagStatus bagType={bagType} />
                    </span>
                  }
                />
              </ListItem>
            </>
          )}
        </List>
      </div>
      <div className={classes.containerWrapper}>
        <List>
          <ListItem>
            <TimerIcon />
            <LabelledValue label="Goal Time" value={textDuration(goalTime)} />
          </ListItem>
        </List>
      </div>
    </>
  );
};

export { SummaryContent };
