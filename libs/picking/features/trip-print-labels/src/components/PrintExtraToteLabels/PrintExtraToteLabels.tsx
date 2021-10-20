import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Keyboard } from '@material-ui/icons';
import { useAddExtraTotes, useGetNextTrip, useGetPrintersPoolList } from '@rf2/picking/data/api';
import { AddExtraTotesInput } from '@rf2/picking/data/api-contracts';
import { PrinterSelectionPopup } from '@rf2/picking/features/print-selection';
import { GlobalState } from '@rf2/shared/global-state';
import {
  canDispatchOrder,
  shouldPrintBagLabelsForCollectOrders,
  shouldPrintBagLabelsForDeliveryNowOrders,
  shouldPrintBagLabelsForDeliveryOrders,
} from '@rf2/shared/utility';
import { BottomActions, Button, Container, Header, Loader } from '@rf2/ui';
import { find as _find } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AddLabelToTotePopup } from './components/AddLabelsToTotePopup';
import { ExtraToteLabelsPopup } from './components/ExtraToteLabelsPopup';
import { IdentifierLabelPopup } from './components/IdentifierLabelPopup';
import { PrintedToteLabelConfirmationPopup } from './components/PrintedToteLabelConfirmationPopup';

interface PrintExtraToteLabelsPropTypes {
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

const PrintExtraToteLabels: React.FC<PrintExtraToteLabelsPropTypes> = ({ globalState }) => {
  const classes = useStyles();
  const {
    userContext: { userName, branchNo },
    featureFlags: {
      isDeliveryNowBagLabelEnabled,
      isSingleOrderDispatchEnabled,
      isCollectBagsRequiredEnabled,
      isPayForEachBagEnabled,
    },
    trolleyType,
  } = globalState;
  const { data } = useGetNextTrip(userName, branchNo, trolleyType);
  const { data: printersPoolListData } = useGetPrintersPoolList(branchNo);
  const [identifierLabel, setIdentifierLabel] = useState(null);
  const [labelQuantity, setLabelQuantity] = useState(null);
  const [showIdentifierLabelPopup, setShowIdentifierLabelPopup] = useState(false);
  const [showAddLabelToTotePopup, setShowAddLabelToTotePopup] = useState(false);
  const [printerPool, setPrinterPool] = useState(null);
  const [showPrintedLabelConfirmation, setShowPrintedLabelConfirmation] = useState(false);
  const [showExtraToteLabelsPopup, setShowExtraToteLabelsPopup] = useState(false);
  const [showPrinterSelectionPopup, setShowPrinterSelectionPopup] = useState(false);
  const history = useHistory();

  const onAddExtraTotesComplete = () => {
    setShowPrintedLabelConfirmation(true);
  };

  const onIdentifierLabelConfirm = (barcode) => {
    setShowIdentifierLabelPopup(false);
    setIdentifierLabel(barcode);
  };

  const { addExtraTotes, addExtraTotesData, loading } = useAddExtraTotes(
    userName,
    branchNo,
    trolleyType,
    onAddExtraTotesComplete
  );

  const onAddLabelConfirm = (quantity) => {
    setLabelQuantity(quantity);
  };

  useEffect(() => {
    if (identifierLabel) {
      setShowAddLabelToTotePopup(true);
    }
  }, [identifierLabel]);

  useEffect(() => {
    if (labelQuantity) {
      setShowAddLabelToTotePopup(false);

      if (printerPool) {
        addExtraTotesHandler();
      } else if (printersPoolListData.printerPools.length === 1) {
        setPrinterPool(printersPoolListData.printerPools[0]);
      } else {
        setShowPrinterSelectionPopup(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelQuantity]);

  useEffect(() => {
    if (printerPool) {
      setShowPrinterSelectionPopup(false);
      addExtraTotesHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printerPool]);

  const handlePrinterPoolSelection = (value) => {
    setPrinterPool(printersPoolListData.printerPools.find(({ id }) => value === id));
  };

  const addExtraTotesHandler = () => {
    const tote = _find(data.totes, { barcode: identifierLabel });
    const extraTotesInput: AddExtraTotesInput = {
      userName: userName,
      branchNo: branchNo,
      trolleyId: data.id,
      orderNo: tote.orderNo,
      pickingZoneId: tote.pickingZoneId,
      pickingZoneName: tote.pickingZoneName,
      count: parseInt(labelQuantity),
      printerPoolId: printerPool.id,
      currentToteIds: data.totes.map((t) => t.id),
    };

    addExtraTotes({
      variables: {
        addExtraTotesInput: extraTotesInput,
      },
    });

    setIdentifierLabel(null);
    setLabelQuantity(null);
  };

  const onClose = () => {
    setShowExtraToteLabelsPopup(false);

    if (shouldPrintBagLabelsForDeliveryNowOrders(isDeliveryNowBagLabelEnabled, data)) {
      history.push('/print-extra-labels/delivery-express');
    } else if (shouldPrintBagLabelsForDeliveryOrders(isPayForEachBagEnabled, data)) {
      history.push('/print-extra-labels/delivery');
    } else if (shouldPrintBagLabelsForCollectOrders(isCollectBagsRequiredEnabled, data)) {
      history.push('/print-extra-labels/collect');
    } else if (canDispatchOrder(data, isSingleOrderDispatchEnabled)) {
      history.push('/dispatch-order');
    } else {
      history.push('/');
    }
  };

  const onCancelAddLabel = () => {
    setShowAddLabelToTotePopup(false);
    setIdentifierLabel(null);
  };

  return (
    <>
      <Header>
        <Typography variant="h1" component="h1">
          Print Extra Labels
        </Typography>
      </Header>
      <div className={classes.content}>
        <Container>
          <Typography className={classes.message} variant="h3" component="h3">
            Scan tote label for which extra labels are required.
          </Typography>
        </Container>
      </div>
      <div className={classes.manualScan}>
        <Fab color="secondary" aria-label="manual scan" onClick={() => setShowIdentifierLabelPopup(true)}>
          <Keyboard />
        </Fab>
      </div>
      <BottomActions>
        <Button onClick={() => setShowExtraToteLabelsPopup(true)}>CLOSE</Button>
      </BottomActions>
      <Loader isLoading={loading} />
      <ExtraToteLabelsPopup
        isOpen={showExtraToteLabelsPopup}
        onConfirm={() => setShowExtraToteLabelsPopup(false)}
        onCancel={onClose}
      />
      {data && (
        <>
          {showIdentifierLabelPopup && (
            <IdentifierLabelPopup
              totes={data.totes}
              onConfirm={onIdentifierLabelConfirm}
              onClose={() => setShowIdentifierLabelPopup(false)}
            />
          )}
          {showAddLabelToTotePopup && (
            <AddLabelToTotePopup
              tote={_find(data.totes, { barcode: identifierLabel })}
              onConfirm={onAddLabelConfirm}
              onClose={onCancelAddLabel}
            />
          )}
          {showPrinterSelectionPopup && (
            <PrinterSelectionPopup
              printersPoolList={printersPoolListData}
              onPoolSelection={handlePrinterPoolSelection}
            />
          )}
          {showPrintedLabelConfirmation && (
            <PrintedToteLabelConfirmationPopup
              extraLabels={addExtraTotesData.addExtraTotes.totes}
              onClose={() => setShowPrintedLabelConfirmation(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export { PrintExtraToteLabels };
