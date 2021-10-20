/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { interceptGql } from './intercept-gql';
import { scanBarcode } from './scan-barcode';

declare global {
  namespace Cypress {
    interface Chainable {
      scanBarcode: typeof scanBarcode;
      interceptGql: typeof interceptGql;
    }
  }
  interface Window {
    PubSub: { publishSync<M, T>(message: M, data?: T): boolean };
    __e2e: { globalState: { userContext: Record<string, any>; featureFlags: Record<string, any> } };
  }
}

Cypress.Commands.add('scanBarcode', scanBarcode);
Cypress.Commands.add('interceptGql', interceptGql);
