import { useSetToteItemSuppliedQuantity } from '@rf2/picking/data/api';
import { Order, PEBConfig, ToteItem } from '@rf2/picking/data/api-contracts';
import {
  ArticleNotFound,
  DatePopup,
  PickAnotherArticlePopup,
  PickAnotherOrProceedWithCurrentArticlePopup,
  QuantityAboveLimitOverrideNotAllowed,
  QuantityAboveTheTolerance,
  QuantityBelowLimit,
  RemoveItemFromShelfPopup,
  triggerBeebTone,
} from '@rf2/picking/features/supply';
import {
  BarcodeData,
  BarcodeType,
  calculateShelfLifeExpiryDate,
  ExpiryDateStatus,
  isWeightedQuantityArticle,
  quantityValidationErrors,
  SupplyTypes,
  useBarcodeValidator,
  validateExpiryDate,
} from '@rf2/shared/utility';
import { format, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { QuantitySuppliedPopup } from '../QuantitySuppliedPopup';

interface BarcodeSupplyPropTypes {
  scannedBarcode: string;
  invokeWScan: (barcodeData: BarcodeData) => void;
  resetScannedBarcode: () => void;
  currentToteItem: ToteItem;
  isDataBarEnabled: boolean;
  validateExpiryShelfLife: boolean;
  defaultShelfLife: number;
  order: Order;
  pebConfig: [PEBConfig];
}

const BarcodeSupply: React.FC<BarcodeSupplyPropTypes> = ({
  invokeWScan,
  scannedBarcode,
  currentToteItem,
  isDataBarEnabled,
  validateExpiryShelfLife,
  defaultShelfLife,
  order,
  resetScannedBarcode,
  pebConfig,
}) => {
  const barcodeValidatorResponse = useBarcodeValidator(
    scannedBarcode,
    currentToteItem,
    isDataBarEnabled,
    validateExpiryShelfLife,
    defaultShelfLife,
    order?.deliveryDate,
    pebConfig
  );

  const { appendQuantityToToteItem } = useSetToteItemSuppliedQuantity();
  const [showArticleNotFound, setShowArticleNotFound] = useState(false);
  const [showExpiryDatePopup, setShowExpiryDatePopup] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(new Date());
  const [showRemoveItemFromShelfPopup, setShowRemoveItemFromShelfPopup] = useState(false);
  const [
    showPickAnotherOrProceedWithCurrentArticlePopup,
    setShowPickAnotherOrProceedWithCurrentArticlePopup,
  ] = useState(false);

  const [showPickAnotherArticlePopup, setShowPickAnotherArticlePopup] = useState(false);

  const { preferredExpiryDate, minExpiryDate, defaultExpiryDate } = calculateShelfLifeExpiryDate(
    currentToteItem?.article?.preferredShelfLife,
    currentToteItem?.article?.minShelfLife,
    order?.deliveryDate,
    defaultShelfLife,
    'PPPP'
  );

  const [expiryDateStatus, setExpiryDateStatus] = useState(barcodeValidatorResponse?.expiryDateStatus);
  const [weightValidationStatus, setWeightValidationStatus] = useState(
    barcodeValidatorResponse?.weightValidationStatus
  );

  const [formatedPreferredExpiryDate, setFormatedPreferredExpiryDate] = useState(
    preferredExpiryDate ? format(parse(preferredExpiryDate, 'PPPP', new Date()), 'd-MMM') : null
  );

  const [formatedMinExpiryDate, setFormatedMinExpiryDate] = useState(
    minExpiryDate ? format(parse(minExpiryDate, 'PPPP', new Date()), 'd-MMM') : null
  );

  const [formatedDefaultExpiryDate, setFormatedDefaultExpiryDate] = useState(
    defaultExpiryDate ? format(parse(defaultExpiryDate, 'PPPP', new Date()), 'd-MMM') : null
  );

  // const [barcodeValidatorResponse, setBarcodeValidatorResponse] = useState(validationResponse);
  const [showQuantityBelowLimit, setShowQuantityBelowLimit] = useState(false);
  const [showQuantityAboveLimit, setShowQuantityAboveLimit] = useState(false);
  const [showQuantityAboveTolerance, setShowQuantityAboveTolerance] = useState(false);
  const [showMaximumQuantitySupplied, setShowMaximumQuantitySupplied] = useState(false);

  const isWeighted = isWeightedQuantityArticle(currentToteItem);

  useEffect(() => {
    ReactDOM.unstable_batchedUpdates(() => {
      if (barcodeValidatorResponse) {
        if (barcodeValidatorResponse.showArticleMaximumQuantitySupplied) {
          triggerBeebTone();
          setShowMaximumQuantitySupplied(true);
          return;
        }
        if (barcodeValidatorResponse.isBarcodeMatchFound) {
          if (barcodeValidatorResponse.barcodeType === BarcodeType.GS1) {
            if (barcodeValidatorResponse.promptExpiryDatePopup) {
              setShowExpiryDatePopup(true);
              return;
            }

            if (barcodeValidatorResponse.expiryDateStatus !== ExpiryDateStatus.IsValid) {
              setExpiryDateStatus(barcodeValidatorResponse.expiryDateStatus);
              showExpiryDateConfirmation(barcodeValidatorResponse.expiryDateStatus);
              return;
            }

            if (barcodeValidatorResponse.weightValidationStatus !== null) {
              setWeightValidationStatus(barcodeValidatorResponse.weightValidationStatus);
              showWeightToleranceWarnings(barcodeValidatorResponse.weightValidationStatus);
              return;
            }
          }

          if (barcodeValidatorResponse.showWscanPopUp) {
            invokeWScan(barcodeValidatorResponse.barcodeData);
            resetScannedBarcode();
            return;
          }

          isWeighted
            ? appendQuantityToToteItem(
                currentToteItem,
                barcodeValidatorResponse.barcodeData.weight,
                barcodeValidatorResponse.barcodeData,
                barcodeValidatorResponse.isPrimary ? SupplyTypes.PRIMARY : SupplyTypes.SILENTSUB
              )
            : appendQuantityToToteItem(
                currentToteItem,
                1,
                barcodeValidatorResponse.barcodeData,
                barcodeValidatorResponse.isPrimary ? SupplyTypes.PRIMARY : SupplyTypes.SILENTSUB
              );

          resetScannedBarcode();
        } else {
          triggerBeebTone();
          setShowArticleNotFound(true);
        }
      }
    });
  }, [barcodeValidatorResponse, expiryDateStatus, weightValidationStatus]);

  const showExpiryDateConfirmation = (expiryDateStatus: ExpiryDateStatus) => {
    switch (expiryDateStatus) {
      case ExpiryDateStatus.ExpiryDateBeforeToday:
        setShowRemoveItemFromShelfPopup(true);
        break;
      case ExpiryDateStatus.ExpiryDateAfterTodayBeforeMinDefaultShelfLife:
        setShowPickAnotherOrProceedWithCurrentArticlePopup(true);
        break;
      case ExpiryDateStatus.ExpiryDateAfterMinBeforePreferred:
        setShowPickAnotherOrProceedWithCurrentArticlePopup(true);
        break;
      case ExpiryDateStatus.ExpiryDateAfterTodayBeforeMinNoPreferred:
        setShowPickAnotherArticlePopup(true);
        break;
      case ExpiryDateStatus.ExpiryDateAfterTodayBeforeMin:
        setShowPickAnotherArticlePopup(true);
        break;
    }
  };

  const showWeightToleranceWarnings = (weightValidationStatus) => {
    switch (weightValidationStatus) {
      case quantityValidationErrors.WEIGHT_BELOW_LIMIT:
      case quantityValidationErrors.QUANTITY_GREATER_THAN_ZERO:
      case quantityValidationErrors.VALID_QUANTITY:
      case quantityValidationErrors.DECIMALS_NOT_ALLOWED:
        setShowQuantityBelowLimit(true);
        break;
      case quantityValidationErrors.WEIGHT_EXCEEDING_SECONDARY_WEIGHT_RANGE:
      case quantityValidationErrors.WEIGHT_EXCEEDING_PRIMARY_WEIGHT_RANGE_BUT_WITHIN_SECONDARY:
      case quantityValidationErrors.WEIGHT_QUANTITY_EXCEEDS_PRIMARY_TOLERANCE:
        currentToteItem?.article?.weightOverride
          ? setShowQuantityAboveTolerance(true)
          : setShowQuantityAboveLimit(true);
        break;
    }
  };

  const onExpiryDateChange = (date: Date) => {
    if (validateExpiryShelfLife) {
      barcodeValidatorResponse.expiryDateStatus = validateExpiryDate(
        currentToteItem.article.preferredShelfLife,
        currentToteItem.article.minShelfLife,
        order.deliveryDate,
        defaultShelfLife,
        date
      );
    } else {
      barcodeValidatorResponse.expiryDateStatus = ExpiryDateStatus.IsValid;
    }
    ReactDOM.unstable_batchedUpdates(() => {
      setShowExpiryDatePopup(false);
      barcodeValidatorResponse.promptExpiryDatePopup = false;
      setExpiryDateStatus(barcodeValidatorResponse.expiryDateStatus);
      setExpiryDate(date);
    });
  };

  const onAcceptWeightOverride = () => {
    barcodeValidatorResponse.weightValidationStatus = null;
    setWeightValidationStatus(null);
    setShowQuantityAboveTolerance(false);
    //resetScannedBarcode();
  };

  return (
    <>
      <ArticleNotFound
        isOpen={showArticleNotFound}
        onClose={() => {
          setShowArticleNotFound(false);
          resetScannedBarcode();
        }}
      ></ArticleNotFound>

      <PickAnotherOrProceedWithCurrentArticlePopup
        isOpen={showPickAnotherOrProceedWithCurrentArticlePopup}
        preferredExpiryDate={
          preferredExpiryDate || minExpiryDate ? formatedPreferredExpiryDate : formatedDefaultExpiryDate
        }
        {...(!defaultExpiryDate && { minExpiryDate: formatedMinExpiryDate })}
        onPickAnotherArticle={() => {
          resetScannedBarcode();
          setShowPickAnotherOrProceedWithCurrentArticlePopup(false);
        }}
        onProceedWithCurrentArticle={() => {
          ReactDOM.unstable_batchedUpdates(() => {
            barcodeValidatorResponse.expiryDateStatus = ExpiryDateStatus.IsValid;
            setExpiryDateStatus(ExpiryDateStatus.IsValid);
            setShowPickAnotherOrProceedWithCurrentArticlePopup(false);
          });
        }}
      />

      <PickAnotherArticlePopup
        isOpen={showPickAnotherArticlePopup}
        minExpiryDate={minExpiryDate ? formatedMinExpiryDate : formatedDefaultExpiryDate}
        onPickAnotherArticle={() => {
          ReactDOM.unstable_batchedUpdates(() => {
            setShowPickAnotherArticlePopup(false);
            resetScannedBarcode();
          });
        }}
      />
      <RemoveItemFromShelfPopup
        isOpen={showRemoveItemFromShelfPopup}
        onClose={() => {
          setShowRemoveItemFromShelfPopup(false);
          resetScannedBarcode();
        }}
      />

      <DatePopup
        date={expiryDate}
        isOpen={showExpiryDatePopup}
        onOk={() => {
          onExpiryDateChange(expiryDate);
          setShowExpiryDatePopup(false);
        }}
        onClose={() => {
          setShowExpiryDatePopup(false);
          resetScannedBarcode();
        }}
        onChange={(date) => setExpiryDate(date)}
      />
      <QuantityBelowLimit
        isOpen={showQuantityBelowLimit}
        onClose={() => {
          setShowQuantityBelowLimit(false);
          resetScannedBarcode();
        }}
      ></QuantityBelowLimit>
      <QuantityAboveTheTolerance
        isOpen={showQuantityAboveTolerance}
        onNoClick={() => {
          setShowQuantityAboveTolerance(false);
          resetScannedBarcode();
        }}
        onYesClick={onAcceptWeightOverride}
      ></QuantityAboveTheTolerance>
      <QuantityAboveLimitOverrideNotAllowed
        isOpen={showQuantityAboveLimit}
        onClose={() => {
          setShowQuantityAboveLimit(false);
          resetScannedBarcode();
        }}
      ></QuantityAboveLimitOverrideNotAllowed>
      <QuantitySuppliedPopup
        isOpen={showMaximumQuantitySupplied}
        onClose={() => {
          setShowMaximumQuantitySupplied(false);
          resetScannedBarcode();
        }}
      />
    </>
  );
};

export { BarcodeSupply };
