import { makeStyles, Typography } from '@material-ui/core';
import { Order } from '@rf2/picking/data/api-contracts';
import { LabelledValue, PopUpModal } from '@rf2/ui';
import React from 'react';

interface OrderNotFoundPopupProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const useStyles = makeStyles((theme) => ({
  list: {
    '& > p': {
      marginBottom: theme.spacing(1),
    },
    '& > div': {
      marginBottom: theme.spacing(1),
      '& > div': {
        '&:last-child': {
          fontWeight: 500,
          fontSize: '1rem',
          lineHeight: '1rem',
          color: '#171C1F',
        },
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
}));

const OrderNotFoundPopup: React.FC<OrderNotFoundPopupProps> = ({ isOpen, onClose, order }) => {
  const classes = useStyles();
  const bodyContent = (
    <div className={classes.list}>
      <Typography variant="body1">Use computer to dispatch.</Typography>
      <LabelledValue value={order?.customerName} />
      <LabelledValue label="Order No." value={`#${order?.id}`} />
    </div>
  );

  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText={bodyContent}
      headerText="Sorry, we can't find that order number."
      closeOrOkText="Ok, end trip"
    />
  );
};

export { OrderNotFoundPopup };
