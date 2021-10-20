import { setCallBack } from '../call-back/set-callback';
import { activateLegacyApp } from './activate-legacy-app';

export const publishEventsToIframe = (pathname, state) => {
  const eventToBeSentToLegacy = /^\/legacy\/(.+)$/i.exec(pathname)?.[1];
  //console.log(pathname);
  //console.log(eventToBeSentToLegacy);
  if (eventToBeSentToLegacy) {
    if (state?.callBackUrl && state?.callBackAction) {
      setCallBack(state?.callBackUrl, state?.callBackAction);
    }
    activateLegacyApp(eventToBeSentToLegacy, state);
    //setShowNewApp(false);
    return false;
  }
  return true;
};
