import { useSetToteItemSuppliedQuantity } from '@rf2/picking/data/api';
import { ToteItem } from '@rf2/picking/data/api-contracts';
import {
  ArticleType,
  BarcodeData,
  convertGramsToKg,
  hasAlreadySupplied,
  isExceedingSecondaryEachWeightRange,
  isExceedingSecondaryWeightRange,
  isInSecondaryEachWeightRange,
  isInSecondaryWeightRange,
  isWeightedQuantityArticle,
  SupplyTypes,
} from '@rf2/shared/utility';
import { toNumber as _toNumber } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ArticleExceedsPrimaryTolerancePopup } from '../ArticleExceedsPrimaryTolerancePopup';
import { ArticleExceedsSecondaryTolerancePopup } from '../ArticleExceedsSecondaryTolerancePopup';
import { ArticleRecalledPopup } from '../ArticleRecalledPopup';
import { BarcodeScanRequired } from '../BarcodeScanRequired';
import { QuantitySuppliedPopup } from '../QuantitySuppliedPopup';
import { WeightsDoNotMatchPopup } from '../WeightsDoNotMatchPopup';
import { WontScan } from '../WontScan';

interface SupplyContainerPropTypes {
  hasWontScanBeenInvoked: boolean;
  onCloseWontScan: () => void;
  currentToteItem: ToteItem;
  barcodeData?: BarcodeData;
}

const SupplyContainer: React.FC<SupplyContainerPropTypes> = ({
  hasWontScanBeenInvoked,
  onCloseWontScan,
  currentToteItem,
  barcodeData,
}) => {
  const [showWontScan, setShowWontScan] = useState(false);
  const [showQuantitySuppliedPopup, setShowQuantitySuppliedPopup] = useState(false);
  const [showBarcodeScanRequirePopUp, setShowBarcodeScanRequirePopUp] = useState(false);
  const [showWeightsDoNotMatchPopup, setShowWeightsDoNotMatchPopup] = useState(false);
  const [exceedsPrimaryToleranceQuantityValue, setExceedsPrimaryToleranceQuantityValue] = useState(0);
  const [exceedsSecondaryToleranceQuantityValue, setExceedsSecondaryToleranceQuantityValue] = useState(0);
  const [showArticleRecalledPopUp, setShowArticleRecalledPopUp] = useState(false);
  const [isSubbed, setIsSubbed] = useState(false);
  const { appendQuantityToToteItem } = useSetToteItemSuppliedQuantity();
  const isKgArticle = currentToteItem?.article?.pricingUnit === ArticleType.KG;
  const isWeighted = isWeightedQuantityArticle(currentToteItem);
  const defaultPEBBarcodeData: BarcodeData = {
    isValidBarcode: true,
    calculatedBarcode: '200000000004',
    suppliedPrice: 0.01,
    weight: 0.4,
    batchNo: '',
    expiryDate: null,
    retrievedBarcode: '',
  };

  useEffect(() => {
    if (hasWontScanBeenInvoked) {
      if (currentToteItem.article.productRecall || currentToteItem.article.productWithdrawal) {
        setShowArticleRecalledPopUp(true);
      } else if (currentToteItem.orderedQuantity > currentToteItem.article.wscanQuantityLimit) {
        setShowBarcodeScanRequirePopUp(true);
      } else if (
        hasAlreadySupplied(
          currentToteItem.totalSuppliedQuantity,
          currentToteItem.orderedQuantity,
          isKgArticle,
          currentToteItem.article.weightPrimaryTolerance
        )
      ) {
        setShowQuantitySuppliedPopup(true);
      } else {
        setShowWontScan(true);
      }
    }
  }, [hasWontScanBeenInvoked, currentToteItem, isKgArticle]);

  // useEffect(() => {
  //   if (!showWontScan) {
  //     onCloseWontScan();
  //   }
  // }, [showWontScan, onCloseWontScan]);

  const handleConfirm = (quantityValue, isSub) => {
    setShowWontScan(false);
    setIsSubbed(isSub);
    if (
      (isKgArticle &&
        currentToteItem.article?.weightOverride &&
        isInSecondaryWeightRange(quantityValue, currentToteItem)) ||
      (currentToteItem.article?.useWeightRange &&
        currentToteItem.article?.weightOverride &&
        isInSecondaryEachWeightRange(quantityValue, currentToteItem))
    ) {
      setExceedsPrimaryToleranceQuantityValue(quantityValue);
    } else if (
      (isKgArticle &&
        currentToteItem.article?.weightOverride &&
        isExceedingSecondaryWeightRange(quantityValue, currentToteItem)) ||
      (currentToteItem.article?.useWeightRange &&
        currentToteItem.article?.weightOverride &&
        isExceedingSecondaryEachWeightRange(quantityValue, currentToteItem))
    ) {
      setExceedsSecondaryToleranceQuantityValue(quantityValue);
    } else {
      applyConfirm(quantityValue, isSub);
    }
  };

  const onConfirmExceedsPrimaryTolerance = (quantityValue) => {
    setExceedsPrimaryToleranceQuantityValue(0);
    applyConfirm(quantityValue, isSubbed);
  };

  const onConfirmExceedsSecondaryTolerance = (quantityValue, inputError) => {
    setExceedsSecondaryToleranceQuantityValue(0);
    if (!inputError) {
      applyConfirm(quantityValue, isSubbed);
    } else {
      setShowWeightsDoNotMatchPopup(true);
    }
  };

  const applyConfirm = (quantityValue, isSub) => {
    const scannedBarcodeDataOrDefaultInCaseOfWontScan =
      barcodeData != null ? barcodeData : isWeighted ? defaultPEBBarcodeData : null;
    appendQuantityToToteItem(
      currentToteItem,
      _toNumber(isWeighted ? convertGramsToKg(quantityValue) : quantityValue),
      scannedBarcodeDataOrDefaultInCaseOfWontScan,
      isSub ? SupplyTypes.SILENTSUB : SupplyTypes.PRIMARY
    );
    handleOnWontScanClose();
  };

  const handleOnWontScanClose = () => {
    setShowWontScan(false);
    onCloseWontScan();
  };

  return (
    <>
      <QuantitySuppliedPopup
        isOpen={showQuantitySuppliedPopup}
        onClose={() => {
          setShowQuantitySuppliedPopup(false);
          handleOnWontScanClose();
        }}
      />
      <ArticleRecalledPopup
        isOpen={showArticleRecalledPopUp}
        onClose={() => {
          setShowArticleRecalledPopUp(false);
          handleOnWontScanClose();
        }}
      />
      <BarcodeScanRequired
        isOpen={showBarcodeScanRequirePopUp}
        onClose={() => {
          setShowBarcodeScanRequirePopUp(false);
          handleOnWontScanClose();
        }}
      />
      <WeightsDoNotMatchPopup
        isOpen={showWeightsDoNotMatchPopup}
        onClose={() => setShowWeightsDoNotMatchPopup(false)}
      />
      {exceedsPrimaryToleranceQuantityValue > 0 && (
        <ArticleExceedsPrimaryTolerancePopup
          quantityValue={exceedsPrimaryToleranceQuantityValue}
          onClose={() => setExceedsPrimaryToleranceQuantityValue(0)}
          onConfirm={onConfirmExceedsPrimaryTolerance}
        />
      )}
      {exceedsSecondaryToleranceQuantityValue > 0 && (
        <ArticleExceedsSecondaryTolerancePopup
          quantityValue={exceedsSecondaryToleranceQuantityValue}
          onClose={() => setExceedsSecondaryToleranceQuantityValue(0)}
          onConfirm={onConfirmExceedsSecondaryTolerance}
        />
      )}
      {showWontScan && (
        <WontScan
          toteItem={currentToteItem}
          onClose={handleOnWontScanClose}
          onConfirm={handleConfirm}
          qtyFromBarcodeScan={barcodeData?.retrievedQty}
          isPrimary={
            currentToteItem.article.barcodes.find(
              (x) => parseInt(x.barcode) === parseInt(barcodeData?.calculatedBarcode)
            )?.isPrimary
          }
        />
      )}
    </>
  );
};

export { SupplyContainer };
