import PubSub from 'pubsub-js';
import { LegacyEvents, LegacyEventTypes } from '../lib/constants';

export const returnToLegacyTrolleyMain = (eventData?) => {
  PubSub.publish(LegacyEvents.ExecuteEventsInLegacy, {
    eventName: LegacyEventTypes.ExitToTrolleyMain,
    eventData: eventData,
  });
};
