import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';

And('I pack this trolley', () => {
  cy.contains('Pack this trolley').click();
});

And('I click on continue button', () => {
  cy.contains('Continue').click();
});

Then('I should validate the Back button as disabled', () => {
  cy.contains('BACK').should('be.disabled').should('be.visible');
});

Then('I should validate the Back button as enabled', () => {
  cy.contains('BACK').should('be.enabled').should('be.visible');
});

And('FWD button as enabled', () => {
  cy.contains('FWD').should('be.enabled').should('be.visible');
});

And('I click on FWD button {} times', (number) => {
  for (var i = 0; i < number; i++) {
    cy.contains('FWD').click();
  }
});

Then('I should see the {} article which is un-supplied collectible', (articleID) => {
  cy.contains(articleID).should('be.visible');
});

Given('I have an existing trip with {} tote items unsupplied with quantity {}', (noOfTotes, qty) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.isNewTrolley = false;

    _.data.getNextTrip.toteItems = [
      _.data.getNextTrip.toteItems[0],
      _.data.getNextTrip.toteItems[1],
      _.data.getNextTrip.toteItems[2],
    ];
    var totes = parseInt(noOfTotes);
    for (var i = 0; i < totes; i++) {
      updateSuppliedQuantity(_, i);
    }

    _.data.getNextTrip.toteItems[0].suppliedDetails[0].scanDetails[0].quantity = parseInt(qty);
    _.data.getNextTrip.toteItems[1].suppliedDetails[0].scanDetails[0].quantity = parseInt(qty);
    _.data.getNextTrip.toteItems[2].suppliedDetails[0].scanDetails[0].quantity = parseInt(qty);

    _.data.getNextTrip.collectibles = [];
    _.data.getNextTrip.freeSamples = [];

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Given('I have an existing trip with {} tote items with 1 article supplied and quantity {}', (noOfTotes, qty) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.isNewTrolley = false;
    _.data.getNextTrip.toteItems = [
      _.data.getNextTrip.toteItems[0],
      _.data.getNextTrip.toteItems[1],
      _.data.getNextTrip.toteItems[2],
    ];
    var totes = parseInt(noOfTotes);
    for (var i = 0; i < totes; i++) {
      updateSuppliedQuantity(_, i);
    }
    _.data.getNextTrip.toteItems[0],
      (_.data.getNextTrip.toteItems[1].suppliedDetails[0].scanDetails[0].quantity = parseInt(qty)),
      _.data.getNextTrip.toteItems[2];

    _.data.getNextTrip.collectibles = [];
    _.data.getNextTrip.freeSamples = [];

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Then(
  'I have an existing trip with {} tote items with 2 articles fully supplied with quantity {} and {} rest unsupplied',
  (noOfTotes, qty1, qty2) => {
    cy.fixture('getNextTrip').then(function (_) {
      _.data.getNextTrip.isNewTrolley = false;
      _.data.getNextTrip.toteItems = [
        _.data.getNextTrip.toteItems[0],
        _.data.getNextTrip.toteItems[1],
        _.data.getNextTrip.toteItems[2],
      ];
      var totes = parseInt(noOfTotes);
      for (var i = 0; i < totes; i++) {
        updateSuppliedQuantity(_, i);
      }

      (_.data.getNextTrip.toteItems[0].suppliedDetails[0].scanDetails[0].quantity = parseInt(qty1)),
        (_.data.getNextTrip.toteItems[1].suppliedDetails[0].scanDetails[0].quantity = parseInt(qty2)),
        _.data.getNextTrip.toteItems[2];

      cy.interceptGql('/graphql', {
        getNextTrip: { body: _ },
      });
    });
  }
);

Then(
  'I have an existing trip with {} tote items and 2 collectibles with 1 supplied qty as {} and another un-supplied',
  (noOfTotes, qty1) => {
    cy.fixture('getNextTrip').then(function (_) {
      _.data.getNextTrip.isNewTrolley = false;
      _.data.getNextTrip.toteItems = [
        _.data.getNextTrip.toteItems[0],
        _.data.getNextTrip.toteItems[1],
        _.data.getNextTrip.toteItems[2],
      ];
      var totes = parseInt(noOfTotes);
      for (var i = 0; i < totes; i++) {
        updateSuppliedQuantity(_, i);
      }

      (_.data.getNextTrip.collectibles[0].suppliedQuantity = parseInt(qty1)), _.data.getNextTrip.collectibles[1];

      cy.interceptGql('/graphql', {
        getNextTrip: { body: _ },
      });
    });
  }
);

Then(
  'I have an existing trip with {} tote items and 2 collectibles with 1 supplied qty as {} and another {} as partially supplied',
  (noOfTotes, qty1) => {
    cy.fixture('getNextTrip').then(function (_) {
      _.data.getNextTrip.isNewTrolley = false;
      _.data.getNextTrip.toteItems = [
        _.data.getNextTrip.toteItems[0],
        _.data.getNextTrip.toteItems[1],
        _.data.getNextTrip.toteItems[2],
      ];
      var totes = parseInt(noOfTotes);
      for (var i = 0; i < totes; i++) {
        updateSuppliedQuantity(_, i);
      }
      (_.data.getNextTrip.collectibles[0].suppliedQuantity = parseInt(qty1)),
        (_.data.getNextTrip.collectibles[1].suppliedQuantity = parseInt(qty1)),
        cy.interceptGql('/graphql', {
          getNextTrip: { body: _ },
        });
    });
  }
);

Then(
  'I have an existing trip with {} tote items fully supplied {}, {}, and {} and {} for collectibles un-supplied',
  (noOfTotes, qty1, qty2, qty3) => {
    cy.fixture('getNextTrip').then(function (_) {
      _.data.getNextTrip.isNewTrolley = false;
      _.data.getNextTrip.toteItems = [
        _.data.getNextTrip.toteItems[0],
        _.data.getNextTrip.toteItems[1],
        _.data.getNextTrip.toteItems[2],
      ];
      var totes = parseInt(noOfTotes);
      for (var i = 0; i < totes; i++) {
        updateSuppliedQuantity(_, i);
      }
      _.data.getNextTrip.toteItems[0].suppliedDetails[0].scanDetails[0].quantity = parseInt(qty1);
      _.data.getNextTrip.toteItems[1].suppliedDetails[0].scanDetails[0].quantity = parseInt(qty2);
      _.data.getNextTrip.toteItems[2].suppliedDetails[0].scanDetails[0].quantity = parseInt(qty3);
      _.data.getNextTrip.collectibles[0].suppliedQuantity = parseInt(qty3);
      cy.interceptGql('/graphql', {
        getNextTrip: { body: _ },
      });
    });
  }
);

Then('I have an existing trip with {} tote items with fully {} free samples', (noOfTotes) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.isNewTrolley = false;
    _.data.getNextTrip.toteItems = [
      _.data.getNextTrip.toteItems[0],
      _.data.getNextTrip.toteItems[1],
      _.data.getNextTrip.toteItems[2],
    ];
    var totes = parseInt(noOfTotes);
    for (var i = 0; i < totes; i++) {
      updateSuppliedQuantity(_, i);
    }
    _.data.getNextTrip.toteItems[0].suppliedDetails[0].scanDetails[0].quantity = 3;
    _.data.getNextTrip.toteItems[1].suppliedDetails[0].scanDetails[0].quantity = 3;
    _.data.getNextTrip.toteItems[2].suppliedDetails[0].scanDetails[0].quantity = 5;
    _.data.getNextTrip.freeSamples[0].suppliedQuantity = 12;
    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

function updateSuppliedQuantity(_, i) {
  _.data.getNextTrip.toteItems[i].suppliedDetails = [
    {
      type: 'primary',
      articleId: '28391',
      scanDetails: [
        {
          storePrice: null,
          barcode: '',
          suppliedPrice: 0,
          quantity: 1,
          weight: null,
          batchNo: '',
          expiryDate: '',
          dataBar: '',
          __typename: 'ScanDetail',
        },
      ],
      __typename: 'SuppliedDetail',
    },
  ];
}
