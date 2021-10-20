import Typography from '@material-ui/core/Typography';
import { useGetNextTrip, useGetPrintersPoolList, usePrintCollectLabels } from '@rf2/picking/data/api';
import { PrinterSelectionPopup } from '@rf2/picking/features/print-selection';
import { GlobalState } from '@rf2/shared/global-state';
import { canDispatchOrder, PackagingTypes } from '@rf2/shared/utility';
import { Header, Loader } from '@rf2/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AddBagLabelsCollectPopup } from './components/AddBagLabelsCollectPopup';
import { AddBagLabelsNotRequired } from './components/AddBagLabelsNotRequired';
import { PrintedCollectLabelConfirmationPopup } from './components/PrintedCollectLabelConfirmationPopup';

interface PrintCollectBagLabelsPropTypes {
  globalState: GlobalState;
}

const PrintCollectBagLabels: React.FC<PrintCollectBagLabelsPropTypes> = ({ globalState }) => {
  const {
    userContext: { userName, branchNo },
    featureFlags: { isSingleOrderDispatchEnabled },
    trolleyType,
  } = globalState;
  const { data, loading } = useGetNextTrip(userName, branchNo, trolleyType);
  const { data: printersPoolListData } = useGetPrintersPoolList(branchNo);
  const [labelIndex, setLabelIndex] = useState(null);
  const [labelQuantity, setLabelQuantity] = useState(null);
  const [labelQuantities, setLabelQuantities] = useState(null);
  const [showPrinterSelectionPopup, setShowPrinterSelectionPopup] = useState(false);
  const [printerPool, setPrinterPool] = useState(null);
  const history = useHistory();

  const onComplete = useCallback(() => {
    setLabelIndex(null);
    if (canDispatchOrder(data, isSingleOrderDispatchEnabled)) {
      history.push('/dispatch-order');
    } else {
      history.push('/');
    }
  }, [history, data, isSingleOrderDispatchEnabled]);

  useEffect(() => {
    if (data) {
      setLabelQuantities(
        data.totes.map((tote) => {
          const order = data.orders.find((order) => order.id === tote.orderNo);

          return {
            orderNo: tote.orderNo,
            position: tote.position,
            barcode: tote.barcode,
            labelCount: null,
            isBagLabelsRequired: order.packagingType !== PackagingTypes.NO_BAGS,
          };
        })
      );
      // start flow
      setLabelIndex(0);
    }
  }, [data]);

  const onPrintCollectLabelsComplete = ({ labels }) => {
    const tmpLabelQuantities = [...labelQuantities];
    tmpLabelQuantities[labelIndex].labelCount = labels.length;
    setLabelQuantities(tmpLabelQuantities);
  };

  const { printCollectBagLabels, printCollectLabelsData, printCollectLabelsLoading } = usePrintCollectLabels(
    onPrintCollectLabelsComplete
  );

  useEffect(() => {
    if (labelQuantity > 0) {
      if (printerPool) {
        printCollectLabelHandler();
      } else if (printersPoolListData.printerPools.length === 1) {
        setPrinterPool(printersPoolListData.printerPools[0]);
      } else {
        setShowPrinterSelectionPopup(true);
      }
    } else if (labelQuantity === 0) {
      setLabelQuantity(null);
      handlePrintConfirm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelQuantity]);

  const handleQuantityConfirm = (quantity) => {
    setLabelQuantity(parseInt(quantity));
  };

  useEffect(() => {
    if (printerPool) {
      setShowPrinterSelectionPopup(false);
      printCollectLabelHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printerPool]);

  const printCollectLabelHandler = () => {
    const labelDetails = labelQuantities[labelIndex];

    printCollectBagLabels({
      variables: {
        printCollectBagLabelsInput: {
          userName: userName,
          branchNo: branchNo,
          printerId: printerPool.id,
          labelCount: labelQuantity,
          orderNo: labelDetails.orderNo,
          position: labelDetails.position,
          barcode: labelDetails.barcode,
        },
      },
    });

    setLabelQuantity(null);
  };

  const handlePrintConfirm = () => {
    if (labelIndex < labelQuantities.length - 1) {
      setLabelIndex(labelIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrinterPoolSelection = (value) => {
    setPrinterPool(printersPoolListData.printerPools.find(({ id }) => value === id));
  };

  const showAddBagLabelsInput =
    labelIndex !== null &&
    labelQuantities[labelIndex].labelCount === null &&
    labelQuantities[labelIndex].isBagLabelsRequired &&
    !printCollectLabelsLoading &&
    !showPrinterSelectionPopup;
  const showAddBagLabelsNotRequired =
    labelIndex !== null &&
    labelQuantities[labelIndex].labelCount === null &&
    !labelQuantities[labelIndex].isBagLabelsRequired &&
    !printCollectLabelsLoading &&
    !showPrinterSelectionPopup;
  const showPrintConfirmation = labelIndex !== null && labelQuantities[labelIndex].labelCount > 0;

  return (
    <>
      <Header>
        <Typography variant="h1" component="h1">
          Print Extra Labels
        </Typography>
      </Header>
      <Loader isLoading={loading || printCollectLabelsLoading} />
      {showAddBagLabelsInput && (
        <AddBagLabelsCollectPopup labelCountDetails={labelQuantities[labelIndex]} onConfirm={handleQuantityConfirm} />
      )}
      {showAddBagLabelsNotRequired && (
        <AddBagLabelsNotRequired labelDetails={labelQuantities[labelIndex]} onConfirm={handlePrintConfirm} />
      )}
      {showPrinterSelectionPopup && (
        <PrinterSelectionPopup printersPoolList={printersPoolListData} onPoolSelection={handlePrinterPoolSelection} />
      )}
      {showPrintConfirmation && (
        <PrintedCollectLabelConfirmationPopup
          labelDetails={printCollectLabelsData.printCollectBagLabels}
          onClose={handlePrintConfirm}
        />
      )}
    </>
  );
};

export { PrintCollectBagLabels };
