import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { BagStatus } from '@rf2/ui';
import { Tote, ToteItem, Order, Collectible } from '@rf2/picking/data/api-contracts';
import { LabelledValue } from '@rf2/ui';
import { ArticleType } from '@rf2/shared/utility';

interface ItemQuantitiesPropTypes {
  toteItem: ToteItem | Collectible;
  tote: Tote;
  order: Order;
  showExpiry?: boolean;
}

interface StyledProps {
  showExpiry: boolean;
}

const useStyles = makeStyles<Theme, StyledProps>((theme) => ({
  root: {
    background: theme.palette.common.white,
    borderBottom: ({ showExpiry }) => `1px solid ${showExpiry ? '#F3F3F7' : '#E0E0E0'}`,
    display: 'flex',
    flexDirection: 'row',
    '& > div': {
      width: '25%',
      padding: theme.spacing(1),
      borderLeft: '1px solid #F3F3F7',
      '&:first-child': {
        padding: theme.spacing(1, 1, 1, 2),
        borderLeft: 'none',
      },
      '&:last-child': {
        backgroundColor: '#EEEEEE',
      },
    },
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

const ItemQuantities: React.FC<ItemQuantitiesPropTypes> = ({ toteItem, tote, order, showExpiry = false }) => {
  const classes = useStyles({ showExpiry });
  const {
    orderedQuantity,
    stockOnHand,
    article: { pricingUnit, useWeightRange },
    totalSuppliedQuantity,
  } = toteItem;
  const { position } = tote;
  const { packagingType } = order;
  const unitOrderDisplay = pricingUnit === ArticleType.EACH || useWeightRange ? `(EA)` : '(KG)';

  return (
    <div className={classes.root}>
      <LabelledValue label={`ORD ${unitOrderDisplay}`} value={orderedQuantity} />
      <LabelledValue
        label="SUP"
        value={totalSuppliedQuantity <= orderedQuantity ? totalSuppliedQuantity : orderedQuantity}
      />
      <LabelledValue label="SOH" value={stockOnHand} />
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
  );
};

export { ItemQuantities };
