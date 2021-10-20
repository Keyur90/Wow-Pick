import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Badge } from '@rf2/ui';
import { bagTypeToColor, bagTypeToText } from '@rf2/shared/utility';

interface BagStatusPropTypes {
  bagType: string;
}

const useStyles = makeStyles((theme) => ({
  statusText: {
    fontSize: '1em',
    lineHeight: '1.2em',
    padding: theme.spacing(0.25, 0.75),
    fontWeight: 400,
    color: theme.palette.common.white,
  },
}));

const BagStatus: React.FC<BagStatusPropTypes> = ({ bagType }) => {
  const classes = useStyles();

  return (
    <Badge backgroundColor={bagTypeToColor(bagType)}>
      <Typography noWrap component="span" className={classes.statusText}>
        {bagTypeToText(bagType)}
      </Typography>
    </Badge>
  );
};

export { BagStatus };
