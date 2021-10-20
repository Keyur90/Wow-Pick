/**
 * Intercept handler that specifically is suited for Rest API calls.
 * Spies and records the requests using "operationName" field of the call.
 *
 * Example
  interceptRest(cy, {
    getUsers: { method: "GET", url: "URL", stub: { fixture: 'users.json' } },
    addUsers: { method: "POST", url: "URL", stub: { body: {id: 1, name: 'Reda'} },
    getStores: { method: "GET", url: "URL", stub: [{ fixture: 'stores.json' }, { fixture: 'updatedStores.json' } ]},
    getTrips: { method: "GET", url: "URL", stub: [{ fixture: 'trips.json' }, { body: updatedTrips } ]},
  });
 */
export const interceptRest = (cy, operations) => {
  const requests = {};
  Object.keys(operations).forEach((name) => {
    requests[name] = [];
    const { url, method, stub } = operations[name];
    const numberOfStubbedResponses = Array.isArray(stub) ? stub.length : 1; // If array then will have lenght, if obj then use 1

    cy.intercept(method, url, (req) => {
      requests[name].push(req);
      const numberOfCalls = requests[name].length;
      req.alias = `${name}-${numberOfCalls}`;

      // If the stub then execute it
      if (typeof stub === 'function') return stub(req);

      // If the stub is object then pass it to reply
      if (!Array.isArray(stub)) return req.reply(stub);

      // If you pass an an array of stubs
      if (Array.isArray(stub)) {
        if (numberOfCalls > numberOfStubbedResponses)
          throw new Error(
            `Your test is calling the ${name} operation for the ${numberOfCalls} time, but you only provided ${numberOfStubbedResponses} stub responses.`
          );

        // If the stub then execute it
        const stubForRequest = stub.shift(); // cut the item on the top of the array

        // If the stub then execute it
        if (typeof stubForRequest === 'function') return stub(stubForRequest);
        // else if the stub is object then pass it to reply
        else return req.reply(stub);
      }
    });
  });
  return requests;
};
