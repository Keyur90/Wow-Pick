import Typography from '@material-ui/core/Typography';
import { useElapsedTime, useGetNextTrip } from '@rf2/picking/data/api';
import { GlobalState } from '@rf2/shared/global-state';
import { Header, ProductLoader } from '@rf2/ui';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TripSampleContent } from './components/TripSampleContent';

interface TripSamplePropTypes {
  globalState: GlobalState;
}

const TripSample: React.FC<TripSamplePropTypes> = ({ globalState }) => {
  const {
    userContext: { userName, branchNo },
    trolleyType,
  } = globalState;
  const { data, loading } = useGetNextTrip(userName, branchNo, trolleyType);
  const [currentIndex, setCurrentIndex] = useState(data?.freeSamples?.length > 0 ? 0 : -1);
  const isReadyToRender = !loading && currentIndex !== -1;
  const history = useHistory();

  useElapsedTime(data);

  useEffect(() => {
    if (currentIndex === -1 && !loading) {
      history.push('/trip-picking-end-summary');
    }
  }, [currentIndex]);

  const handleComplete = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= 0 && nextIndex < data?.freeSamples?.length) {
      setCurrentIndex(nextIndex);
    } else {
      history.push('/trip-picking-end-summary');
    }
  };

  return (
    <>
      <Header>
        <Typography variant="h1" component="h1">
          Free Samples
        </Typography>
      </Header>
      {isReadyToRender && (
        <TripSampleContent
          globalState={globalState}
          trolleyId={data.id}
          freeSample={data.freeSamples[currentIndex]}
          tote={data.totes?.find((o) => o.id === data.freeSamples[currentIndex].toteId)}
          order={data.orders?.find((o) => o.id === data.freeSamples[currentIndex].orderNo)}
          onComplete={handleComplete}
          isExpress={data.isExpress}
        />
      )}
      {!isReadyToRender && <ProductLoader />}
    </>
  );
};

export { TripSample };
