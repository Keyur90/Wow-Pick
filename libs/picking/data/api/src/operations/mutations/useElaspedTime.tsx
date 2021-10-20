import { useSetElapsedTime, useUpdateElapsedTime } from '@rf2/picking/data/api';
import { useEffect } from 'react';

const TrafficLightUpdateIntervalInSec = 30;

const TrafficLightStatusUpdateIntervalInSec = 5;

export const useElapsedTime = (tripData) => {
  const elapsedTime = tripData?.elapsedTime;
  const trolleyId = tripData?.id;
  const { setElapsedTime } = useSetElapsedTime();
  const { mutate: updateElapsedTime } = useUpdateElapsedTime();

  useEffect(() => {
    if (tripData) {
      const timer = setInterval(
        () => setElapsedTime(tripData, TrafficLightStatusUpdateIntervalInSec),
        TrafficLightStatusUpdateIntervalInSec * 1000
      );

      return () => {
        clearTimeout(timer);
      };
    }
  }, [tripData?.id]);

  useEffect(() => {
    if (elapsedTime % TrafficLightUpdateIntervalInSec === 0) {
      updateElapsedTime({
        variables: {
          elapsedTimeInput: { trolleyId, elapsedTime },
        },
      });
    }
  }, [elapsedTime, trolleyId, updateElapsedTime]);
};
