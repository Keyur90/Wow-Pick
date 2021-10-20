import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatchOrder, useGetNextTrip } from '@rf2/picking/data/api';
import { OrderDispatchStatus } from '@rf2/picking/data/api-contracts';
import { GlobalState } from '@rf2/shared/global-state';
import { Button, Container, FlexBottomActions, Header, Loader } from '@rf2/ui';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  OrderAlreadyDispatchedPopup,
  OrderCancelledPopup,
  OrderDispatchedPopup,
  OrderNotFoundPopup,
  UseComputerToDispatchPopup,
} from '..';

interface ReadyToDispatchOrderProps {
  globalState: GlobalState;
}

const useStyles = makeStyles((theme) => ({
  content: {
    background: theme.palette.common.white,
  },
  message: {
    padding: theme.spacing(2, 0),
  },
  manualScan: {
    position: 'absolute',
    bottom: 72,
    right: theme.spacing(2),
  },
}));

const ReadyToDispatchOrder: React.FC<ReadyToDispatchOrderProps> = ({ globalState }) => {
  const classes = useStyles();
  const {
    userContext: { userName, branchNo },
    trolleyType,
  } = globalState;
  const { data } = useGetNextTrip(userName, branchNo, trolleyType);
  const history = useHistory();
  const { mutate: dispatchOrder, dispatchData, loading } = useDispatchOrder();

  const [showOrderDispatchedPopup, setShowOrderDispatchedPopup] = useState(false);
  const [showUseComputerToDispatch, setShowUseComputerToDispatch] = useState(false);
  const [showOrderAlreadyDispatchedPopup, setShowOrderAlreadyDispatchedPopup] = useState(false);
  const [showOrderCancelledPopup, setShowOrderCancelledPopup] = useState(false);
  const [showOrderNotFoundPopup, setShowOrderNotFoundPopup] = useState(false);

  useEffect(() => {
    if (dispatchData) {
      switch (dispatchData?.dispatchOrder?.status) {
        case OrderDispatchStatus.ORDERALREADYDISPATCHED:
          setShowOrderAlreadyDispatchedPopup(true);
          return;
        case OrderDispatchStatus.ORDERCANCELLED:
          setShowOrderCancelledPopup(true);
          return;
        case OrderDispatchStatus.ORDERNOTFOUND:
          setShowOrderNotFoundPopup(true);
          return;
        default:
          setShowOrderDispatchedPopup(true);
          return;
      }
    }
  }, [dispatchData]);

  const onDone = () => {
    history.push('/');
  };

  const DispatchOrder = () => {
    dispatchOrder({ variables: { orderNo: data?.orders[0].id } });
  };

  return loading ? (
    <Loader isLoading={loading} />
  ) : (
    <>
      <Header>
        <Typography variant="h1" component="h1">
          Quick Order Dispatch
        </Typography>
      </Header>
      <div className={classes.content}>
        <Container>
          <Typography className={classes.message} variant="h3" component="h3">
            Ready to dispatch order?
          </Typography>
        </Container>
      </div>
      <FlexBottomActions>
        <Button onClick={DispatchOrder}>Yes, Dispatch!</Button>
        <Button onClick={() => setShowUseComputerToDispatch(true)}>No, not yet</Button>
      </FlexBottomActions>

      <OrderDispatchedPopup isOpen={showOrderDispatchedPopup} onClose={onDone} order={data?.orders[0]} />

      <UseComputerToDispatchPopup isOpen={showUseComputerToDispatch} onClose={onDone} order={data?.orders[0]} />

      <OrderAlreadyDispatchedPopup isOpen={showOrderAlreadyDispatchedPopup} onClose={onDone} order={data?.orders[0]} />

      <OrderNotFoundPopup isOpen={showOrderNotFoundPopup} onClose={onDone} order={data?.orders[0]} />

      <OrderCancelledPopup isOpen={showOrderCancelledPopup} onClose={onDone} order={data?.orders[0]} />
    </>
  );
};

export { ReadyToDispatchOrder };
