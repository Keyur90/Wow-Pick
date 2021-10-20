import { makeStyles } from '@material-ui/core';
import { Order } from '@rf2/picking/data/api-contracts';
import { LabelledValue, PopUpModal } from '@rf2/ui';
import React from 'react';

interface OrderDispatchedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const useStyles = makeStyles((theme) => ({
  list: {
    '& > div': {
      marginBottom: theme.spacing(1),
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
}));

const OrderDispatchedPopup: React.FC<OrderDispatchedPopupProps> = ({ isOpen, onClose, order }) => {
  const classes = useStyles();
  const bodyContent = (
    <div className={classes.list}>
      <LabelledValue value={order?.customerName} />
      <LabelledValue label="Order No." value={`#${order?.id}`} />
    </div>
  );

  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText={bodyContent}
      headerText="Order Dispatched!"
      closeOrOkText="Done"
    />
  );
};

export { OrderDispatchedPopup };
