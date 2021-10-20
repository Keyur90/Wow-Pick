import { useElapsedTime, useGetNextTrip } from '@rf2/picking/data/api';
import { GlobalState } from '@rf2/shared/global-state';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SkeletonLoader } from './components/SkeletonLoader';
import { SummaryContent } from './components/SummaryContent';
import { SummaryFooter } from './components/SummaryFooter';
import { SummaryHeader } from './components/SummaryHeader';

interface TripSummaryPropTypes {
  globalState: GlobalState;
}

const TripSummary: React.FC<TripSummaryPropTypes> = ({ globalState }) => {
  const history = useHistory();

  const {
    userContext: { userName, branchNo },
    trolleyType,
  } = globalState;

  const { data, loading } = useGetNextTrip(userName, branchNo, trolleyType);

  useElapsedTime(data);

  const handleStartTrip = () => {
    // navigate and start trip
    if (data.toteItems?.length > 0) history.push('/trip-item');
    else if (data.collectibles?.length > 0) {
      history.push('/trip-collectible');
    } else if (data.freeSamples?.length > 0) {
      history.push('/trip-sample');
    }
  };

  const handleReprintValues = () => {
    // reprint labels
    history.push('/print-labels/reprint');
  };

  return (
    <>
      <SummaryHeader />
      <div>
        {!loading && data && (
          <>
            <SummaryContent
              isExpressTrip={data.isExpress}
              isBulkTrip={data.isBulk}
              totes={data.totes.length}
              articles={data.toteItems.length}
              labels={data.totes.length}
              goalTime={data.goalTime}
              bagType={data.isExpress ? data.orders?.[0]?.packagingType : null}
            />
            <SummaryFooter
              onStartTrip={handleStartTrip}
              onReprintLabels={handleReprintValues}
              isExpressTrip={data.isExpress}
            />
          </>
        )}
        {loading && <SkeletonLoader />}
      </div>
    </>
  );
};

export { TripSummary };
