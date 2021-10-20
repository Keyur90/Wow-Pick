import React from 'react';
import { trim as _trim, capitalize as _capitalize } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { Container, BagStatus, LabelledValue } from '@rf2/ui';
import { FreeSample, Tote, Order } from '@rf2/picking/data/api-contracts';
import { Typography } from '@material-ui/core';

interface FreeSampleDetailsPropTypes {
  freeSample: FreeSample;
  tote: Tote;
  order: Order;
}

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const useStyles = makeStyles((theme) => ({
  primaryContent: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2, 0, 0),
    background: theme.palette.common.white,
    borderBottom: '1px solid #E0E0E0',
  },
  description: {
    padding: theme.spacing(0, 0, 2),
    minHeight: 100,
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    color: '#171C1F',
  },
  secondaryContent: {
    background: theme.palette.common.white,
    borderBottom: '1px solid #E0E0E0',
  },
  instruction: {
    display: 'flex',
    alignItems: 'center',
  },
  tote: {
    marginLeft: 'auto',
    marginRight: theme.spacing(-2),
    width: `calc(25% + ${theme.spacing(1)}px)`,
    backgroundColor: '#EEEEEE',
    padding: theme.spacing(1),
  },
  toteStatus: {
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      fontSize: '0.75rem',
      lineHeight: '0.75rem',
      marginLeft: theme.spacing(0.5),
    },
  },
}));

const FreeSampleDetails: React.FC<FreeSampleDetailsPropTypes> = ({ freeSample, tote, order }) => {
  const classes = useStyles();
  const { description } = freeSample;
  const { packagingType } = order;
  const { position } = tote;
  const truncatedDescription = _capitalize(description);

  return (
    <>
      <div className={classes.primaryContent}>
        <div className={classes.description}>
          <Container>
            <ResponsiveEllipsis text={truncatedDescription} maxLine="3" ellipsis={`...`} trimRight basedOn="letters" />
          </Container>
        </div>
      </div>
      <div className={classes.secondaryContent}>
        <Container>
          <div className={classes.instruction}>
            <Typography variant="body1">Please add this free sample to</Typography>
            <div className={classes.tote}>
              <LabelledValue
                label="TOTE"
                value={
                  <div className={classes.toteStatus}>
                    {position}
                    <BagStatus bagType={packagingType} />
                  </div>
                }
                emphasis
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export { FreeSampleDetails };
