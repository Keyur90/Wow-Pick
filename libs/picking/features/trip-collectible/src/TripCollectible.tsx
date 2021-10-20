import Typography from '@material-ui/core/Typography';
import { useElapsedTime, useGetNextTrip } from '@rf2/picking/data/api';
import { GlobalState } from '@rf2/shared/global-state';
import { Header, ProductLoader } from '@rf2/ui';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TripCollectibleContent } from './components/TripCollectibleContent';

interface TripCollectiblePropTypes {
  globalState: GlobalState;
}

const TripCollectible: React.FC<TripCollectiblePropTypes> = ({ globalState }) => {
  const {
    userContext: { userName, branchNo },
    trolleyType,
  } = globalState;
  const { data, loading } = useGetNextTrip(userName, branchNo, trolleyType);
  const [currentIndex, setCurrentIndex] = useState(
    data?.collectibles ? data.collectibles.findIndex((item) => item.totalSuppliedQuantity === 0) : -1
  );

  const isReadyToRender = !loading && currentIndex !== -1;
  const history = useHistory();

  useElapsedTime(data);

  useEffect(() => {
    if (currentIndex === -1 && !loading) {
      moveToFreeSampleOrPickingEndSummary();
    }
  }, [currentIndex, data, loading]);

  const handleComplete = () => {
    const nextIndex = data.collectibles.findIndex(
      (item, pos) => pos > currentIndex && item.totalSuppliedQuantity === 0
    );
    if (nextIndex >= 0) {
      setCurrentIndex(nextIndex);
    } else {
      moveToFreeSampleOrPickingEndSummary();
    }
  };

  const moveToFreeSampleOrPickingEndSummary = () => {
    history.push(data?.freeSamples && !!data.freeSamples.length ? '/trip-sample' : '/trip-picking-end-summary');
  };

  return (
    <>
      <Header>
        <Typography variant="h1" component="h1">
          Collectibles
        </Typography>
      </Header>
      {isReadyToRender && (
        <TripCollectibleContent
          key={currentIndex}
          globalState={globalState}
          trolleyId={data.id}
          collectible={data.collectibles[currentIndex]}
          tote={data.totes?.find((o) => o.id === data.collectibles[currentIndex].toteId)}
          order={data.orders?.find((o) => o.id === data.collectibles[currentIndex].orderNo)}
          onComplete={handleComplete}
          isExpress={data.isExpress}
        />
      )}
      {!isReadyToRender && <ProductLoader />}
    </>
  );
};

export { TripCollectible };
