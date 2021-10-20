import { CyHttpMessages, RouteHandler } from 'cypress/types/net-stubbing';

type GqlOperations = { [operationName: string]: RouteHandler | RouteHandler[] };
interface GqlState {
  operations: GqlOperations;
  requests: { [operationName: string]: CyHttpMessages.IncomingHttpRequest[] };
}
const GQL_STATE_CACHE_KEY = '__interceptGqlState';
/**
 * Intercept handler that specifically is suited for GraphQL calls.
 * Spies and records the requests using "operationName" field of the call.
 *
 * Example
  cy.interceptGql('/graphql', {
    users: { fixture: 'users.json' },
    addUser: { body: {id: 1, name: 'user name'},
    stores: [{ fixture: 'stores.json' }, { fixture: 'updatedStores.json' } ],
    trolleyTrips: [{ fixture: 'trips.json' }, { body: updatedTrips } ]},
  });
 */
export const interceptGql = (url: string, operationsToStub: GqlOperations): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cy.get('@testCaseScopedState').then((testCaseScopedState: any) => {
    let state: GqlState = testCaseScopedState[GQL_STATE_CACHE_KEY]?.get(url);

    // If first time during test case lifetime to call interceptGql with the passed url
    const isFirstTime = state === undefined;
    if (isFirstTime) {
      // then we need to setup test case lifetime scoped state for the passed url
      state = setupInterceptGqlState(testCaseScopedState, url);
      // and to setup cypress intercept for this url
      setupCypressIntercept(state, url);
    }

    // Update the state with passed operationsToStub
    const { operations, requests } = state;
    Object.keys(operationsToStub).forEach((operationName) => {
      operations[operationName] = operationsToStub[operationName];
      requests[operationName] = [];
    });
  });
};

const setupInterceptGqlState = (testCaseScopedState, url: string): GqlState => {
  if (!testCaseScopedState[GQL_STATE_CACHE_KEY]) testCaseScopedState[GQL_STATE_CACHE_KEY] = new Map();

  const initialState: GqlState = { operations: {}, requests: {} };
  testCaseScopedState[GQL_STATE_CACHE_KEY].set(url, initialState);
  return initialState;
};

const setupCypressIntercept = ({ operations, requests }: GqlState, url: string) => {
  cy.intercept('POST', url, (req) => {
    const operationName = req.body.operationName;
    const stub = operations[operationName];

    if (!stub) {
      console.log(`No stub was provided for "${operationName}" GraphQL operation.`);
      return;
    }

    requests[operationName].push(req);
    const numberOfCalls = requests[operationName].length;
    req.alias = `${operationName}-${numberOfCalls}`;

    // If the stub then execute it
    if (typeof stub === 'function') return stub(req);

    // If the stub is object then pass it to reply
    if (!Array.isArray(stub)) return req.reply(stub);

    // If you pass an an array of stubs
    if (Array.isArray(stub)) {
      const numberOfStubbedResponses = stub.length;

      if (numberOfCalls > numberOfStubbedResponses[operationName])
        throw new Error(
          `Your test is calling the ${operationName} GraphQL operation for the ${numberOfCalls} time, but you only provided ${numberOfStubbedResponses} stub responses.`
        );
      // If the stub then execute it
      const stubForRequest = stub.shift(); // cut the item on the top of the array
      // If the stub then execute it
      if (typeof stubForRequest === 'function') return stubForRequest(req);
      // else if the stub is object then pass it to reply
      else return req.reply(stubForRequest);
    }
  });
};
