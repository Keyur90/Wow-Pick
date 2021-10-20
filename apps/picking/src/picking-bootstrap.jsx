/* eslint-disable no-debugger */
import { ApolloClient, from, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { apolloCache, LastUpdatedTicksLink } from '@rf2/picking/data/api';
import { TrolleyType } from '@rf2/shared/utility';
import { createBrowserHistory, createMemoryHistory } from 'history';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import App from './app/App';
import { environment } from './environments/environment';

const client = new ApolloClient({
  cache: apolloCache,
  link: from([new LastUpdatedTicksLink(), new HttpLink({ uri: environment.wowpickApiUrl })]),
});

export let globalState = {};

// ToDO: I have commented out the interaction with parent history till Wesley refactor this

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath, initialPathState, sharedGlobalState }) => {
  const history = defaultHistory || createMemoryHistory();

  globalState = sharedGlobalState;

  // if (initialPath) history.push(initialPath, initialPathState);

  history.push('/');

  if (onNavigate) {
    // history.listen(onNavigate);
  }

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App history={history} globalState={globalState} />
    </ApolloProvider>,
    el
  );

  return {
    onParentNavigate({ pathname: nextPathname, state: newState }) {
      // const { pathname } = history.location;
      // if (pathname !== nextPathname) {
      //   history.push(nextPathname, newState);
      // }
      //console.log("container navigation detected");
    },
  };
};

// If we are in development and in isolation then call mount immediately
if (process.env.NODE_ENV === 'development' || window.__e2e) {
  const devRoot = document.getElementById('picking-root');

  if (devRoot) {
    const sharedGlobalState = window.__e2e?.globalState || {
      userContext: { userName: '1759.12', branchNo: '1759' },
      featureFlags: {
        normalTripEnabled: true,
        isRfRedesignPickToPictureEnabled: true,
        showExpiryDateInfo: true,
        canSkipToteBarcodeScan: true,
        showToteDialogForExpress: true,
        isDataBarEnabled: true,
        validateExpiryShelfLife: true,
        defaultShelfLife: 1,
        isDeliveryNowBagLabelEnabled: true,
        isCollectBagsRequiredEnabled: true,
        isSingleOrderToteLabelPrintingDisabled: false,
        isSingleOrderDispatchEnabled: true,
        isPayForEachBagEnabled: true,
      },
      trolleyType: TrolleyType.NORMAL,
    };

    mount(devRoot, { defaultHistory: createBrowserHistory(), sharedGlobalState });
  }
}

const unmount = (element) => {
  // this method invoked every time an component is unmounted (unloaded)
  // clear the apollo cached objects , any new queries a network call is made instead of reading from cache
  // See 'Is there a way to delete cache query': https://github.com/apollographql/apollo-client/issues/6795
  // The below code clears
  //  1. all responses for any occurred mutations 'ROOT_MUTATION'
  //  2. all responses for queries that should NOT be used cross trips 'ROOT_QUERY.getNextTrip'
  //  So, we are keeping getPEBConfigs, and getPrintersPoolList query responses in memory to be reused across trips

  const cache = client.cache;
  cache.evict({ id: 'ROOT_QUERY', fieldName: 'getNextTrip' });
  cache.evict({ id: 'ROOT_MUTATION' });
  cache.gc(); // removes all objects from the normalized cache that are not reachable ( ex: totes, orders, totes items etc..)

  unmountComponentAtNode(element);
};

// Export mount, and unmount to be expose our app as a micro frontend
export { mount, unmount };
