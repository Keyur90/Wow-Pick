import {
  currentTripStateVar,
  hasReturnedFromTripPickingEndSummary,
  hasSupplyQuantityModifiedVar,
  useGetNextTrip,
  useGetPEBConfigs,
  useSetToteItemSuppliedQuantity,
  useUpdateToteItemQuantity,
} from '@rf2/picking/data/api';
import { SuppliedToteItemInput } from '@rf2/picking/data/api-contracts';
import {
  ArticleNotFound,
  BarcodeSupply,
  CheckLastScannedArticlePopup,
  ResetCurrentSuppliedQuantityPopup,
  SupplyContainer,
  TotePositionDialog,
  useBarcodeScanner,
} from '@rf2/picking/features/supply';
import { GlobalState } from '@rf2/shared/global-state';
import { ArticleType, BarcodeData } from '@rf2/shared/utility';
import { Header, ProductLoader } from '@rf2/ui';
import { omit } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { OrderInformationPopup } from './components/OrderInformationPopup';
import { TripItemContent } from './components/TripItemContent';
import { TripItemFooter } from './components/TripItemFooter';
import { TripItemHeader } from './components/TripItemHeader';
import { useTripNavigator } from './hooks';

interface TripItemPropTypes {
  globalState: GlobalState;
}

const TripItem: React.FC<TripItemPropTypes> = ({ globalState }) => {
  const {
    userContext: { userName, branchNo },
    featureFlags: {
      isRfRedesignPickToPictureEnabled,
      showExpiryDateInfo,
      canSkipToteBarcodeScan,
      showToteDialogForExpress,
      isDataBarEnabled,
      validateExpiryShelfLife,
      defaultShelfLife,
    },
    trolleyType,
  } = globalState;

  const tripState = currentTripStateVar();
  const allPEBConfigs = 'false';

  const { pebConfigData, pebLoading } = useGetPEBConfigs(allPEBConfigs);
  const { data, loading } = useGetNextTrip(userName, branchNo, trolleyType);

  const { resetToteItemQuantity } = useSetToteItemSuppliedQuantity();
  const {
    currentIndex,
    viewAll,
    navigateNext,
    navigatePrevious,
    canNavigatePrevious,
    toggleView,
    isLastItem,
  } = useTripNavigator(data?.toteItems, tripState.toteItemIndexToView, tripState.viewAll);
  const [hasWontScanBeenInvoked, setHasWontScanBeenInvoked] = useState(false);
  const [showResetCurrentSuppliedPopUp, setShowResetCurrentSuppliedPopUp] = useState(false);
  const [showOrderInformation, setShowOrderInformation] = useState(false);
  const [showToteLabelScan, setShowToteLabelScan] = useState(false);
  const { mutate: updateToteItemQuantity } = useUpdateToteItemQuantity();
  const [showArticleNotFound, setShowArticleNotFound] = useState(false);

  const [fwdClicked, setFwdClicked] = useState(false);
  const shouldCheckLastScannedItem = currentIndex === null && !data?.isNewTrolley;
  const [showCheckLastScannedArticlePopup, setShowCheckLastScannedArticlePopup] = useState(shouldCheckLastScannedItem);

  const currentToteItem = currentIndex !== null ? data?.toteItems[currentIndex] : null;
  const currentOrder =
    currentIndex !== null ? data?.orders?.find((o) => o.id === data?.toteItems[currentIndex].orderNo) : null;
  const history = useHistory();

  const [scannedBarcode, setScannedBarcode] = useState();
  const [barcodeDataFromBarcodeScan, setBarcodeDataFromBarcodeScan] = useState(null);

  useEffect(() => {
    if (currentToteItem !== null) {
      if (hasSupplyQuantityModifiedVar().isDirty) {
        const isFullySupplied = currentToteItem.totalSuppliedQuantity >= currentToteItem.orderedQuantity;
        if (isFullySupplied) {
          onForwardClick();
        }
      }
    }
  }, [currentToteItem]);

  const resetCurrentSuppliedQuantity = () => {
    resetToteItemQuantity(currentToteItem);
    setShowResetCurrentSuppliedPopUp(false);
  };

  const updateSuppliedQuantityOrShowToteLabelScan = () => {
    const stateOfSuppliedQuantity = hasSupplyQuantityModifiedVar();
    if (stateOfSuppliedQuantity.isDirty) {
      if (stateOfSuppliedQuantity.modifiedQuantity > 0) {
        if (!data.isExpress || showToteDialogForExpress) {
          setShowToteLabelScan(true);
          return true;
        }
      } else {
        updateSuppliedQuantity();
      }
    }
    return false;
  };

  const onForwardClick = () => {
    setScannedBarcode(null);
    setFwdClicked(true);
    if (!updateSuppliedQuantityOrShowToteLabelScan()) moveToNextItemOrCollectibleOrSamples();
  };

  const onPreviousClick = () => {
    setFwdClicked(false);
    if (!updateSuppliedQuantityOrShowToteLabelScan()) {
      navigatePrevious();
    }
  };

  const closeToteLabelScanAndMoveForward = () => {
    updateSuppliedQuantity();
    setShowToteLabelScan(false);
    fwdClicked ? moveToNextItemOrCollectibleOrSamples() : navigatePrevious();
  };

  const handleScannedBarcode = (scanType, scannedBarcode) => {
    if (!showToteLabelScan) {
      setScannedBarcode(scannedBarcode);
    }
  };

  const updateSuppliedQuantity = () => {
    const suppliedToteItemInput: SuppliedToteItemInput[] = [
      {
        userName: globalState.userContext.userName,
        branchNo: globalState.userContext.branchNo,
        trolleyId: data.id,
        id: currentToteItem.id,
        suppliedDetails: currentToteItem.suppliedDetails.map((supplyDetail) => {
          const result = omit(supplyDetail, '__typename');
          result.scanDetails = result.scanDetails.map((scanDetail) => omit(scanDetail, '__typename'));
          return result;
        }),
      },
    ];

    updateToteItemQuantity({
      variables: { suppliedToteItemInput },
    });
  };

  const moveToNextItemOrCollectibleOrSamples = () => {
    if (isLastItem) {
      if (hasReturnedFromTripPickingEndSummary()) {
        history.push('/trip-picking-end-summary');
        return;
      }
      const hasCollectibles = !!data.collectibles?.filter((item) => item.totalSuppliedQuantity === 0).length;
      const hasSamples = !!data?.freeSamples && !!data.freeSamples.length;
      if (hasCollectibles) {
        history.push('/trip-collectible');
      } else if (hasSamples) {
        history.push('/trip-sample');
      } else {
        history.push('/trip-picking-end-summary');
      }
    } else {
      navigateNext();
    }
  };

  useBarcodeScanner(handleScannedBarcode);

  const showWontScan = () => {
    return currentToteItem?.article.pricingUnit === ArticleType.KG
      ? currentToteItem?.article.wontScanKg
      : currentToteItem?.article.wontScanEach;
  };

  const handleInvokeWontScan = (barcodeData: BarcodeData) => {
    ReactDOM.unstable_batchedUpdates(() => {
      setHasWontScanBeenInvoked(true);
      setBarcodeDataFromBarcodeScan(barcodeData);
    });
  };

  const handleWontScanClose = () => {
    setHasWontScanBeenInvoked(false);
    setBarcodeDataFromBarcodeScan(null);
  };

  const isReadyToRender = !loading && data && currentIndex !== null && !pebLoading && pebConfigData;

  return (
    <>
      {isReadyToRender && (
        <>
          {scannedBarcode && (
            <BarcodeSupply
              defaultShelfLife={defaultShelfLife}
              invokeWScan={handleInvokeWontScan}
              scannedBarcode={scannedBarcode}
              currentToteItem={currentToteItem}
              isDataBarEnabled={isDataBarEnabled}
              validateExpiryShelfLife={validateExpiryShelfLife}
              order={currentOrder}
              resetScannedBarcode={() => setScannedBarcode(null)}
              pebConfig={pebConfigData}
            />
          )}
          <CheckLastScannedArticlePopup
            isOpen={showCheckLastScannedArticlePopup}
            onClose={() => setShowCheckLastScannedArticlePopup(false)}
          />
          <ArticleNotFound isOpen={showArticleNotFound} onClose={() => setShowArticleNotFound(false)} />
          <ResetCurrentSuppliedQuantityPopup
            isOpen={showResetCurrentSuppliedPopUp}
            onCloseClick={() => setShowResetCurrentSuppliedPopUp(false)}
            onConfirmClick={resetCurrentSuppliedQuantity}
          />
          <OrderInformationPopup
            isOpen={showOrderInformation}
            order={currentOrder}
            onClose={() => setShowOrderInformation(false)}
          />
          <SupplyContainer
            hasWontScanBeenInvoked={hasWontScanBeenInvoked}
            onCloseWontScan={handleWontScanClose}
            currentToteItem={currentToteItem}
            barcodeData={barcodeDataFromBarcodeScan}
          />
          <Header>
            <TripItemHeader
              tripData={data}
              toteItem={currentToteItem}
              toteItemIndex={data.toteItems.length - currentIndex}
              totalItems={data.toteItems.length}
              viewAll={viewAll}
            />
          </Header>
          <TripItemContent
            toteItem={currentToteItem}
            tote={data.totes?.find((o) => o.id === currentToteItem.toteId)}
            order={currentOrder}
            isRfRedesignPickToPictureEnabled={isRfRedesignPickToPictureEnabled}
            showExpiryDateInfo={showExpiryDateInfo}
            defaultShelfLife={defaultShelfLife}
          />

          <TripItemFooter
            onWScanClick={() => setHasWontScanBeenInvoked(true)}
            isWScanEnabled={showWontScan()}
            onItemPrevious={onPreviousClick}
            onItemNext={onForwardClick}
            canNavigatePrevious={canNavigatePrevious}
            onToggleView={toggleView}
            viewAll={viewAll}
            toteItem={currentToteItem}
            onResetCurrentSuppliedItem={() => setShowResetCurrentSuppliedPopUp(true)}
            onShowOrderInformation={() => setShowOrderInformation(true)}
          />
          <TotePositionDialog
            userName={userName}
            branchNo={branchNo}
            isOpen={showToteLabelScan}
            position={data.totes?.find((o) => o.id === currentToteItem.toteId).position}
            quantity={hasSupplyQuantityModifiedVar().modifiedQuantity}
            toteBarcode={data.totes?.find((o) => o.id === currentToteItem.toteId).barcode}
            onSuccessfulScan={closeToteLabelScanAndMoveForward}
            canSkipToteBarcodeScan={canSkipToteBarcodeScan}
            isExpress={data.isExpress}
            order={currentOrder}
            alternateToteBarcodes={data.totes
              ?.filter((x) => x.orderNo === currentOrder.id && x.id !== currentToteItem.toteId)
              .map((x) => x.barcode)}
            toteItemId={currentToteItem.id.toString()}
            isKgOrWeightRange={
              currentToteItem.article.pricingUnit === ArticleType.KG || currentToteItem.article.useWeightRange
            }
          ></TotePositionDialog>
        </>
      )}
      {!isReadyToRender && (
        <>
          <Header />
          <ProductLoader />
        </>
      )}
    </>
  );
};

export { TripItem };
