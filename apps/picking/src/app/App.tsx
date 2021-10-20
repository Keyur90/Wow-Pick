import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { ReadyToDispatchOrder } from '@rf2/picking/features/dispatch-order';
import { PrintSelection } from '@rf2/picking/features/print-selection';
import { TripCollectible } from '@rf2/picking/features/trip-collectible';
import { TripItem } from '@rf2/picking/features/trip-item';
import { TripPackingSummary } from '@rf2/picking/features/trip-packing-summary';
import { TripPickingEndSummary } from '@rf2/picking/features/trip-picking-end-summary';
import { PrintExtraLabels } from '@rf2/picking/features/trip-print-labels';
import { TripSample } from '@rf2/picking/features/trip-sample';
import { TripSummary } from '@rf2/picking/features/trip-summary';
import { ZeroTotesFound } from '@rf2/picking/features/zero-totes-to-pick';
import { GlobalState } from '@rf2/shared/global-state';
import { theme } from '@rf2/ui';
import React from 'react';
import { Redirect, Route, Router, RouterProps, Switch } from 'react-router-dom';

interface AppPropTypes {
  globalState: GlobalState;
}

const App: React.FC<AppPropTypes & RouterProps> = ({ history, globalState }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router history={history}>
      <Switch>
        <Route path="/trip-item">
          <TripItem globalState={globalState} />
        </Route>
        <Route path="/trip-collectible">
          <TripCollectible globalState={globalState} />
        </Route>
        <Route path="/trip-sample">
          <TripSample globalState={globalState} />
        </Route>
        <Route path="/trip-picking-end-summary">
          <TripPickingEndSummary globalState={globalState} />
        </Route>
        <Route path="/trip-packing-summary">
          <TripPackingSummary globalState={globalState} />
        </Route>
        <Route path="/print-extra-labels">
          <PrintExtraLabels globalState={globalState} />
        </Route>
        <Route path="/dispatch-order">
          <ReadyToDispatchOrder globalState={globalState} />
        </Route>
        <Route path="/trip-summary">
          <TripSummary globalState={globalState} />
        </Route>
        <Route path="/print-labels/:reprint?">
          <PrintSelection globalState={globalState} />
        </Route>
        <Route path="/no-totes-to-pick">
          <ZeroTotesFound globalState={globalState} />
        </Route>
        <Route path="/">
          <Redirect to="/print-labels" />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
