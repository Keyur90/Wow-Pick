import { makeStyles, Typography } from '@material-ui/core';
import { Order } from '@rf2/picking/data/api-contracts';
import { PopUpModal } from '@rf2/ui';
import React from 'react';

interface OrderAlreadyDispatchedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const useStyles = makeStyles((theme) => ({
  list: {
    '& > p': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const OrderAlreadyDispatchedPopup: React.FC<OrderAlreadyDispatchedPopupProps> = ({ isOpen, onClose, order }) => {
  const classes = useStyles();
  const bodyContent = (
    <div className={classes.list}>
      <Typography variant="body1">Order was already dispatched.</Typography>
      <Typography variant="body1">We can't dispatch again.</Typography>
    </div>
  );

  return (
    <PopUpModal
      isOpen={isOpen}
      onOkClick={onClose}
      bodyText={bodyContent}
      headerText="Sorry,"
      closeOrOkText="OK, end trip"
    />
  );
};

export { OrderAlreadyDispatchedPopup };
