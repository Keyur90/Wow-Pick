import { getLegacyWindow } from '../../app/device-events-dispatcher';

export const activateLegacyApp = (eventName, args) => {
  getLegacyWindow().postMessage({ event: 'eventFromNewApp', name: eventName, args }, '*');
};
