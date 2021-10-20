import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

interface LabelledValuePropTypes {
  label?: string;
  value: string | number | React.ReactNode;
  emphasis?: boolean;
}

interface StyledProps {
  emphasis: boolean;
}

const useStyles = makeStyles<Theme, StyledProps>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: '0.875rem',
    color: ({ emphasis }) => (emphasis ? '#171C1F' : '#899195'),
    letterSpacing: '0.75px',
  },
  value: {
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    color: '#171C1F',
  },
}));

const LabelledValue: React.FC<LabelledValuePropTypes> = ({ label, value, emphasis = false }) => {
  const classes = useStyles({ emphasis });

  return (
    <div className={classes.root}>
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.value}>{value}</div>
    </div>
  );
};

export { LabelledValue };
