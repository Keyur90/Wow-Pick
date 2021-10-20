import { GlobalState } from '@rf2/shared/global-state';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { PrintCollectBagLabels } from '../PrintCollectBagLabels';
import { PrintDeliveryBagLabels } from '../PrintDeliveryBagLabels';
import { PrintDeliveryExpressBagLabels } from '../PrintDeliveryExpressBagLabels';
import { PrintExtraToteLabels } from '../PrintExtraToteLabels';

interface PrintExtraLabelsPropTypes {
  globalState: GlobalState;
}

const PrintExtraLabels: React.FC<PrintExtraLabelsPropTypes> = ({ globalState }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/totes`}>
        <PrintExtraToteLabels globalState={globalState} />
      </Route>
      <Route path={`${path}/delivery`}>
        <PrintDeliveryBagLabels globalState={globalState} />
      </Route>
      <Route path={`${path}/delivery-express`}>
        <PrintDeliveryExpressBagLabels globalState={globalState} />
      </Route>
      <Route path={`${path}/collect`}>
        <PrintCollectBagLabels globalState={globalState} />
      </Route>
    </Switch>
  );
};

export { PrintExtraLabels };
