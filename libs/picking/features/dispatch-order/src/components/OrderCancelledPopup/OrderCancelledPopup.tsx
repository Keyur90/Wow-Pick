import { makeStyles, Typography } from '@material-ui/core';
import { Order } from '@rf2/picking/data/api-contracts';
import { LabelledValue, PopUpModal } from '@rf2/ui';
import React from 'react';
interface OrderCancelledPopupProps {
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

const OrderCancelledPopup: React.FC<OrderCancelledPopupProps> = ({ isOpen, onClose, order }) => {
  const classes = useStyles();
  const bodyContent = (
    <div className={classes.list}>
      <Typography variant="body1">Please double check with Customer Hub.</Typography>
      <LabelledValue value={order?.customerName} />
      <LabelledValue label="Order No." value={`#${order?.id}`} />
    </div>
  );

  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText={bodyContent}
      headerText="Sorry, order cancelled"
      closeOrOkText="OK, end trip"
    />
  );
};

export { OrderCancelledPopup };
