import { makeStyles } from '@material-ui/core';
import { Order } from '@rf2/picking/data/api-contracts';
import { LabelledValue, PopUpModal } from '@rf2/ui';
import React from 'react';

interface UseComputerToDispatchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const useStyles = makeStyles((theme) => ({
  list: {
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

const UseComputerToDispatchPopup: React.FC<UseComputerToDispatchPopupProps> = ({ isOpen, onClose, order }) => {
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
      headerText="Use computer to dispatch:"
      closeOrOkText="Ok, end trip"
    />
  );
};

export { UseComputerToDispatchPopup };
