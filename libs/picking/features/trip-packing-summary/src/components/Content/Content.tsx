import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { TimerIcon } from '@rf2/shared/icons';
import { List, ListItem } from '@rf2/ui';
import { textDuration } from '@rf2/shared/utility';
import { LabelledValue } from '@rf2/picking/features/trip-summary';
import { Tote } from '@rf2/picking/data/api-contracts';

interface ContentPropTypes {
  goalTime: number;
  pickTime: number;
  emptyTotes: Tote[];
}

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    backgroundColor: theme.palette.common.white,
  },
  labelText: {
    fontSize: '1.25rem',
    lineHeight: '1.625rem',
  },
  toteText: {
    fontSize: '1.25rem',
    lineHeight: '1.625rem',
    fontWeight: 700,
  },
}));

const Content: React.FC<ContentPropTypes> = ({ goalTime, pickTime, emptyTotes }) => {
  const classes = useStyles();

  return (
    <>
      {!!emptyTotes.length && (
        <div className={classes.containerWrapper}>
          <List>
            <ListItem>
              <Typography className={classes.labelText}>
                Remove the following label{emptyTotes.length > 1 ? 's' : ''}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography className={classes.toteText}>
                {emptyTotes.map((emptyTote) => `Tote ${emptyTote.position}`).join('; ')}
              </Typography>
            </ListItem>
          </List>
        </div>
      )}
      <div className={classes.containerWrapper}>
        <List>
          <ListItem>
            <TimerIcon />
            <LabelledValue label="Goal time" value={textDuration(goalTime)} />
          </ListItem>
          <ListItem>
            <TimerIcon />
            <LabelledValue label="Pick time" value={textDuration(pickTime)} />
          </ListItem>
        </List>
      </div>
    </>
  );
};

export { Content };
