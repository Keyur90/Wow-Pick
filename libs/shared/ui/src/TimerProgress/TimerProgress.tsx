import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

interface TimerProgressPropTypes {
  startTime: number;
  remaining: number;
  total: number;
}

interface StyleProps {
  progress: number;
}

const getProgress = (timer: number, totalDuration: number) => (1 - timer / totalDuration) * 100;

const getBarColor = (value: number, isBackground: boolean) => {
  if (value < 33.33) {
    return isBackground ? '#b8d5b6' : '#25861E';
  } else if (value < 66.66) {
    return isBackground ? '#FAD494' : '#FF9F00';
  }
  return isBackground ? '#F9B1B4' : '#FF0D16';
};

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  labelWrapper: {
    top: 4,
    left: 4,
    bottom: 4,
    right: 4,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: theme.palette.common.white,
    borderRadius: 40,
    flexWrap: 'wrap',
  },
  labelPrimary: {
    width: '100%',
    color: (props) => getBarColor(props.progress, false),
    fontWeight: 700,
    fontSize: '0.75rem',
    lineHeight: '1.17rem',
    letterSpacing: '0.12px',
    marginTop: theme.spacing(-0.25),
  },
  labelSecondary: {
    width: '100%',
    color: (props) => getBarColor(props.progress, false),
    fontWeight: 400,
    fontSize: '0.6875rem',
    lineHeight: '0.81rem',
    letterSpacing: '0.12px',
    marginTop: theme.spacing(-1.75),
  },
  top: {
    color: (props) => getBarColor(props.progress, false),
  },
  bottom: {
    position: 'absolute',
    left: 0,
    color: (props) => getBarColor(props.progress, true),
  },
  failIcon: {
    color: '#FF0D16',
  },
}));

const TimerProgress: React.FC<TimerProgressPropTypes> = ({ startTime, remaining, total }) => {
  const [counter, setCounter] = useState(startTime);
  const progress = getProgress(counter, startTime);
  const classes = useStyles({ progress });

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => {
        setCounter(counter - 1 / 10);
      }, 100);

      return () => clearTimeout(timer);
    }
  });

  return (
    <div className={classes.root}>
      <div className={classes.labelWrapper}>
        <Typography className={classes.labelPrimary} variant="caption" component="div">
          {progress < 100 ? `${remaining}/${total}` : <SentimentVeryDissatisfiedIcon className={classes.failIcon} />}
        </Typography>
        <Typography className={classes.labelSecondary} variant="caption" component="div">
          {progress < 100 ? 'Left' : 'Fail'}
        </Typography>
      </div>
      <CircularProgress variant="determinate" size={48} value={100} className={classes.bottom} thickness={3} />
      <CircularProgress variant="determinate" size={48} value={progress} className={classes.top} thickness={3} />
    </div>
  );
};

export { TimerProgress };
