import {
  currentTripStateVar,
  hasReturnedFromTripPickingEndSummary,
  updateIntitialStateForHasSupplyQuantityModified,
  useElapsedTime,
  useGetNextTrip,
} from '@rf2/picking/data/api';
import { GlobalState } from '@rf2/shared/global-state';
import { findIndexOfLastUnSuppliedItem, SupplyTypes } from '@rf2/shared/utility';
import { BottomActions, Button, Loader } from '@rf2/ui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ConfirmPackTrolleyPopup } from './components/ConfirmPackTrolleyPopup';
import { Header } from './components/Header';
import { PickingStatus } from './components/PickingStatus';

interface TripPickingEndSummaryPropTypes {
  globalState: GlobalState;
}

const TripPickingEndSummary: React.FC<TripPickingEndSummaryPropTypes> = ({ globalState }) => {
  const history = useHistory();
  const {
    userContext: { userName, branchNo },
    trolleyType,
  } = globalState;
  const { data, loading } = useGetNextTrip(userName, branchNo, trolleyType);
  const [showConfirmPackTrolleyPopup, setShowConfirmPackTrolleyPopup] = useState(false);

  const noOfIncompleteArticles =
    data?.toteItems?.filter((i) => i.totalSuppliedQuantity < i.orderedQuantity).length ?? 0;
  const noOfIncompleteCollectibles =
    data?.collectibles?.filter((i) => i.totalSuppliedQuantity < i.orderedQuantity).length ?? 0;
  const noOfIncompleteFreeSamples = data?.freeSamples?.filter((i) => !i.suppliedQuantity).length ?? 0;
  const noOfIncompleteItems = noOfIncompleteArticles + noOfIncompleteCollectibles;
  const noOfSubstitutedItems = data?.toteItems
    ?.flatMap((x) => x.suppliedDetails.flatMap((s) => s.type))
    .filter((f) => f !== SupplyTypes.PRIMARY).length;
  const isReadyToRender = !loading;

  useElapsedTime(data);

  const handleClickReturnToCurrentLine = () => {
    hasReturnedFromTripPickingEndSummary(true);
    const tripState = currentTripStateVar();

    if (tripState.viewAll) {
      tripState.toteItemIndexToView = data?.toteItems?.length - 1;
    } else {
      const lastItemIndex = findIndexOfLastUnSuppliedItem(data?.toteItems);
      tripState.toteItemIndexToView = lastItemIndex < 0 ? data?.toteItems?.length - 1 : lastItemIndex;
    }

    updateIntitialStateForHasSupplyQuantityModified(
      data?.toteItems[tripState.toteItemIndexToView]?.totalSuppliedQuantity
    );
    currentTripStateVar(tripState);
    history.push('/trip-item');
  };

  const handlePackTrolley = () => {
    if (noOfIncompleteItems + noOfIncompleteFreeSamples > 0) {
      setShowConfirmPackTrolleyPopup(true);
    } else {
      history.push('/trip-packing-summary');
    }
  };

  const onConfirmPackTrolleyTrip = () => {
    setShowConfirmPackTrolleyPopup(false);
    history.push('/trip-packing-summary');
  };

  return (
    <>
      {isReadyToRender && (
        <>
          <Header />
          <PickingStatus
            noOfIncompleteItems={noOfIncompleteItems}
            noOfSubstitutedItems={noOfSubstitutedItems}
          ></PickingStatus>
          <BottomActions>
            <Button
              variant={'outlined'}
              onClick={handleClickReturnToCurrentLine}
              disabled={data?.toteItems?.length === 0}
            >
              Return to current line
            </Button>
            <Button onClick={handlePackTrolley}>Pack this trolley</Button>
          </BottomActions>
        </>
      )}
      {!isReadyToRender && <Loader isLoading={isReadyToRender} />}
      <ConfirmPackTrolleyPopup
        isOpen={showConfirmPackTrolleyPopup}
        onConfirm={onConfirmPackTrolleyTrip}
        onCancel={() => setShowConfirmPackTrolleyPopup(false)}
      />
    </>
  );
};

export { TripPickingEndSummary };
