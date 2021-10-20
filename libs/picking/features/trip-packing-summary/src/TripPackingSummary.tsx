import { useGetNextTrip } from '@rf2/picking/data/api';
import { ExtraToteLabelsPopup } from '@rf2/picking/features/trip-print-labels';
import { GlobalState } from '@rf2/shared/global-state';
import {
  canDispatchOrder,
  getEmptyTotes,
  shouldPrintBagLabelsForCollectOrders,
  shouldPrintBagLabelsForDeliveryNowOrders,
  shouldPrintBagLabelsForDeliveryOrders,
} from '@rf2/shared/utility';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SkeletonLoader } from './components/SkeletonLoader';

interface TripPackingSummaryPropTypes {
  globalState: GlobalState;
}

const TripPackingSummary: React.FC<TripPackingSummaryPropTypes> = ({ globalState }) => {
  const history = useHistory();
  const [showExtraToteLabelsPopup, setShowExtraToteLabelsPopup] = useState(false);

  const {
    userContext: { userName, branchNo },
    featureFlags: {
      isDeliveryNowBagLabelEnabled,
      isCollectBagsRequiredEnabled,
      isSingleOrderToteLabelPrintingDisabled,
      isSingleOrderDispatchEnabled,
      isPayForEachBagEnabled,
    },
    trolleyType,
  } = globalState;
  const { data, loading } = useGetNextTrip(userName, branchNo, trolleyType);
  const emptyTotes = getEmptyTotes(data);

  const handleContinue = () => {
    if (data.isExpress && isSingleOrderToteLabelPrintingDisabled) {
      onNoExtraToteLabels();
    } else {
      setShowExtraToteLabelsPopup(true);
    }
  };

  const onNoExtraToteLabels = () => {
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

  return (
    <>
      <Header />
      {!loading && data && (
        <>
          <Content goalTime={data.goalTime} pickTime={data.elapsedTime} emptyTotes={emptyTotes} />
          <Footer onContinue={handleContinue} />
        </>
      )}
      {loading && <SkeletonLoader />}
      <ExtraToteLabelsPopup
        isOpen={showExtraToteLabelsPopup}
        onConfirm={() => history.push('/print-extra-labels/totes')}
        onCancel={onNoExtraToteLabels}
      />
    </>
  );
};

export { TripPackingSummary };
