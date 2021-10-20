import { TrafficLightStatus, TrafficLightThreshold } from '..';

export const calculateTrafficLightStatus = (goalTime: number, tripTime: number): string => {
  const calculatedPercentage = (tripTime / goalTime) * 100;

  if (calculatedPercentage >= 100) return TrafficLightStatus.Red;

  if (calculatedPercentage > TrafficLightThreshold && calculatedPercentage < 100) return TrafficLightStatus.Yellow;

  return TrafficLightStatus.Green;
};
