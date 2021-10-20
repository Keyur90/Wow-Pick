import { useEffect, useState } from 'react';
import { calculateTrafficLightStatus } from '../calculateTrafficLightStatus';
import { TrafficLightStatus } from '../constants';

export const useTrafficLightStatus = (goalTime: number, elapsedTime: number): { trafficLightStatus: string } => {
  const [trafficLightStatus, setTrafficLightStatus] = useState(TrafficLightStatus.Green);

  useEffect(() => {
    if (!goalTime || !elapsedTime) {
      return;
    }

    setTrafficLightStatus(calculateTrafficLightStatus(goalTime, elapsedTime));
  }, [elapsedTime, goalTime]);

  return { trafficLightStatus };
};
