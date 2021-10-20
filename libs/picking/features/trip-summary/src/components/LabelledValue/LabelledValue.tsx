import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface LabelledValuePropTypes {
  label: string;
  value: string | number | React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  label: {
    marginRight: theme.spacing(0.5),
  },
  value: {
    fontWeight: 500,
    color: theme.palette.common.black,
  },
}));

const LabelledValue: React.FC<LabelledValuePropTypes> = React.memo(({ label, value }) => {
  const classes = useStyles();

  return (
    <span>
      <span className={classes.label}>{label}:</span>
      <span className={classes.value}>{value}</span>
    </span>
  );
});

export { LabelledValue };
