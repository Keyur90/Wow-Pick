import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import App from './app/App';
import { createMemoryHistory, createBrowserHistory } from 'history';
//import { featureFlags } from './lib/feature-flags';

export let globalState = {};

//featureFlags.nextTrolleyTrip = true;
//featureFlags.sequenceWhileInTrip = false;

// Mount function to start up the app
const mount = (rootElement, { onNavigate, defaultHistory, initialPath, initialPathState, sharedGlobalState }) => {
  const history = defaultHistory || createMemoryHistory();

  globalState = sharedGlobalState;

  if (initialPath) history.push(initialPath, initialPathState);

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, rootElement);

  return {
    onParentNavigate({ pathname: nextPathname, state }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname, state);
      }
      //console.log("container navigation detected");
    },
  };
};

// If we are in development and in isolation then call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('legacy-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// Export mount, and unmount to be expose our app as a micro frontend
export { mount, unmountComponentAtNode as unmount };
