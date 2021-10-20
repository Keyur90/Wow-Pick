import { LegacyEvents } from '@rf2/shared/utility';
import PubSub from 'pubsub-js';
import { useEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import * as handlers from '../lib/events-from-legacy';
import { publishEventsToIframe } from '../lib/events-to-legacy';
import './device-events-dispatcher';
import { setIsLegacyAppDisplayed } from './legacy-status';

let legacyCounter = 0;

const App = ({ history }) => {
  const [showNewApp, setShowNewApp] = useState(false);
  useEffect(() => {
    const token = PubSub.subscribe(LegacyEvents.ExecuteEventsInLegacy, (topic, { eventName, eventData }) => {
      history.push(`/legacy/${eventName}`);
    });

    // Events coming from new app
    history.listen(({ pathname, state }) => {
      // 1- If user navigated to home page then display legacy app
      if (pathname === '/') {
        setShowNewApp(false);
        return;
      }
      // 2- If user navigated to path similar to /legacy/eventName then display legacy app and send the event to it
      setShowNewApp(publishEventsToIframe(pathname, state));
    });

    console.log('legacy loaded', legacyCounter++);
    window.addEventListener('message', function (e) {
      if (e.data.event !== 'eventFromLegacyApp') return;

      //      debugger;
      let handledByNewApp = false;
      if (handlers[e.data.name]) {
        handledByNewApp = handlers[e.data.name](history, e);
      }

      // post message back to legacy whether event will be handled by MF or not.
      document.getElementById('legacyRF').contentWindow.postMessage(
        {
          event: 'handlingByNewAppStatus',
          handled: handledByNewApp,
          id: e.data.id,
          args: e.data.args,
        },
        '*'
      );

      // for just POC purposes show the new app
      setShowNewApp(handledByNewApp);
    });

    return () => PubSub.unsubscribe(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.getElementById('legacyRF').style.display = showNewApp ? 'none' : 'block';
    setIsLegacyAppDisplayed(!showNewApp);
  }, [showNewApp]);

  return <Router history={history}></Router>;
};

export default App;
