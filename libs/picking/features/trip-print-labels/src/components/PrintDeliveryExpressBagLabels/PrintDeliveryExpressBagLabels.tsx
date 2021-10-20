import Typography from '@material-ui/core/Typography';
import { useGetNextTrip, useGetPrintersPoolList, usePrintDeliveryLabels } from '@rf2/picking/data/api';
import { PrinterSelectionPopup } from '@rf2/picking/features/print-selection';
import { GlobalState } from '@rf2/shared/global-state';
import { canDispatchOrder } from '@rf2/shared/utility';
import { Header, Loader } from '@rf2/ui';
import { uniqBy as _uniqBy } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AddBagLabelsDeliveryPopup } from './components/AddBagLabelsDeliveryPopup';
import { PrintedDeliveryLabelConfirmationPopup } from './components/PrintedDeliveryLabelConfirmationPopup';

interface PrintDeliveryExpressBagLabelsPropTypes {
  globalState: GlobalState;
}

const PrintDeliveryExpressBagLabels: React.FC<PrintDeliveryExpressBagLabelsPropTypes> = ({ globalState }) => {
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
        _uniqBy([...data.totes], 'pickingZoneId').map((tote) => {
          return {
            orderNo: tote.orderNo,
            pickingZoneId: tote.pickingZoneId,
            pickingZoneName: tote.pickingZoneName,
            barcode: tote.barcode,
            labelCount: null,
          };
        })
      );
      // start flow
      setLabelIndex(0);
    }
  }, [data]);

  const onPrintDeliveryLabelsComplete = ({ labels }) => {
    const tmpLabelQuantities = [...labelQuantities];
    tmpLabelQuantities[labelIndex].labelCount = labels.length;
    setLabelQuantities(tmpLabelQuantities);
  };

  const { printDeliveryBagLabels, printDeliveryLabelsData, printDeliveryLabelsLoading } = usePrintDeliveryLabels(
    onPrintDeliveryLabelsComplete
  );

  useEffect(() => {
    if (labelQuantity > 0) {
      if (printerPool) {
        printDeliveryLabelHandler();
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
      printDeliveryLabelHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printerPool]);

  const printDeliveryLabelHandler = () => {
    const labelDetails = labelQuantities[labelIndex];

    printDeliveryBagLabels({
      variables: {
        printDeliveryBagLabelsInput: {
          ...labelDetails,
          userName: userName,
          branchNo: branchNo,
          printerId: printerPool.id,
          labelCount: labelQuantity,
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

  return (
    <>
      <Header>
        <Typography variant="h1" component="h1">
          Print Extra Labels
        </Typography>
      </Header>
      <Loader isLoading={loading || printDeliveryLabelsLoading} />
      {labelIndex !== null &&
        labelQuantities[labelIndex].labelCount === null &&
        !printDeliveryLabelsLoading &&
        !showPrinterSelectionPopup && (
          <AddBagLabelsDeliveryPopup
            labelCountDetails={labelQuantities[labelIndex]}
            onConfirm={handleQuantityConfirm}
          />
        )}
      {showPrinterSelectionPopup && (
        <PrinterSelectionPopup printersPoolList={printersPoolListData} onPoolSelection={handlePrinterPoolSelection} />
      )}
      {labelIndex !== null && labelQuantities[labelIndex].labelCount > 0 && (
        <PrintedDeliveryLabelConfirmationPopup
          labelDetails={printDeliveryLabelsData.printDeliveryBagLabels}
          onClose={handlePrintConfirm}
        />
      )}
    </>
  );
};

export { PrintDeliveryExpressBagLabels };
