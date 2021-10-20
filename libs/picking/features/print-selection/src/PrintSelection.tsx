import { useReactiveVar } from '@apollo/client';
import { printerPoolVar, useGetNextTrip, useGetPrintersPoolList, usePrintToteLabels } from '@rf2/picking/data/api';
import { useBarcodeScanner } from '@rf2/picking/features/supply';
import { GlobalState } from '@rf2/shared/global-state';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Content, Header, IncorrectLabelScanPopup, NoPrinterAvailablePopup, SkeletonLoader } from './components';

interface PrintSelectionPropTypes {
  globalState: GlobalState;
}

interface ParamTypes {
  reprint?: string;
}

const PrintSelection: React.FC<PrintSelectionPropTypes> = ({ globalState }) => {
  const history = useHistory();
  const { reprint } = useParams<ParamTypes>();
  const {
    userContext: { branchNo, userName },
    featureFlags: { isSingleOrderToteLabelPrintingDisabled },
    trolleyType,
  } = globalState;

  const [showPrinterError, setShowPrinterError] = useState(false);
  const [showScanError, setShowScanError] = useState(false);

  const { data: getNextTripData, loading: getNextTripLoading, error: getNextTripError } = useGetNextTrip(
    userName,
    branchNo,
    trolleyType
  );
  const { data: printersPoolListData, loading: printersPoolListloading } = useGetPrintersPoolList(branchNo);
  const { printToteLabels, printToteLabelsLoading } = usePrintToteLabels(
    (printToteLabels) => {
      if (printToteLabels.error) {
        setShowPrinterError(true);
      } else {
        history.push('/trip-summary');
      }
    },
    () => {
      setShowPrinterError(true);
    }
  );
  const currentPrintPoolVar = useReactiveVar(printerPoolVar);
  const [showPoolSelection, setShowPoolSelection] = useState(false);

  const handlePrinterErrorClose = () => {
    setShowPoolSelection(false);
    printerPoolVar(null);
    history.push('/trip-summary');
  };

  const handlePrintToteLabels = (printerPool) => {
    if (printerPool) {
      printToteLabels({
        variables: {
          printToteLabelsInput: {
            userName: userName,
            branchNo: branchNo,
            printerPoolId: printerPool.id,
          },
        },
      });
      printerPoolVar(printerPool);
    }
  };

  const handleBarcodeScan = (_scanType, scannedBarcode) => {
    const printerPool = printersPoolListData.printerPools.find(({ id }) => scannedBarcode === id);

    if (printerPool) {
      handlePrintToteLabels(printerPool);
    } else {
      setShowScanError(true);
    }
  };

  useBarcodeScanner(handleBarcodeScan);

  useEffect(() => {
    if (!getNextTripLoading && getNextTripData == null && getNextTripError == null) {
      history.push('/no-totes-to-pick');
    }

    if (getNextTripData && printersPoolListData) {
      if (
        (!getNextTripData.isNewTrolley && !reprint) ||
        (isSingleOrderToteLabelPrintingDisabled && getNextTripData.isExpress)
      ) {
        history.push('/trip-summary');
      } else {
        if (printersPoolListData.printerPools.length === 1) {
          handlePrintToteLabels(printersPoolListData.printerPools[0]);
        } else {
          setShowPoolSelection(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNextTripData, printersPoolListData]);

  const handlePoolSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
    handlePrintToteLabels(printersPoolListData.printerPools.find(({ id }) => event.target.value === id));
  };

  const isLoading = getNextTripLoading || printersPoolListloading || printToteLabelsLoading;

  return (
    <>
      <Header showTitle={showPoolSelection} />
      {isLoading && <SkeletonLoader />}
      {!isLoading && showPoolSelection && (
        <Content printersPoolList={printersPoolListData} onPoolSelection={handlePoolSelection} />
      )}
      {showPrinterError && (
        <NoPrinterAvailablePopup printerId={currentPrintPoolVar?.name} onClose={handlePrinterErrorClose} />
      )}
      {showScanError && <IncorrectLabelScanPopup onClose={() => setShowScanError(false)} />}
    </>
  );
};

export { PrintSelection };
