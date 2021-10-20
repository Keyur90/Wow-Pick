import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I have trip with 1 collectible and 1 free sample', () => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
    _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0]];

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Given('I have a trip with {} tote items', (numberOfToteItems) => {
  cy.fixture('getNextTrip').then(function (_) {
    if (numberOfToteItems === '1') {
      _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0]];
      _.data.getNextTrip.totes = [_.data.getNextTrip.totes[0]];
    } else if (numberOfToteItems === '2') {
      _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0], _.data.getNextTrip.toteItems[1]];
      _.data.getNextTrip.totes = [_.data.getNextTrip.totes[0], _.data.getNextTrip.totes[1]];
    } else if (numberOfToteItems === '3') {
      _.data.getNextTrip.toteItems = [
        _.data.getNextTrip.toteItems[0],
        _.data.getNextTrip.toteItems[1],
        _.data.getNextTrip.toteItems[2],
      ];
      _.data.getNextTrip.totes = [_.data.getNextTrip.totes[0], _.data.getNextTrip.totes[1]];
    }

    _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
    _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0]];

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Given('I have a trip with 3 tote items with {} in separate tote', (collectibleOrFreeSample) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.toteItems = [
      _.data.getNextTrip.toteItems[0],
      _.data.getNextTrip.toteItems[1],
      _.data.getNextTrip.toteItems[2],
    ];
    _.data.getNextTrip.totes = [_.data.getNextTrip.totes[0], _.data.getNextTrip.totes[1], _.data.getNextTrip.totes[2]];

    if (collectibleOrFreeSample.toLowerCase() === 'collectible') {
      _.data.getNextTrip.collectibles[0].toteId = '3';
    } else {
      _.data.getNextTrip.freeSamples[0].toteId = '3';
    }

    _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
    _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0]];

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Given('I have a trip with {} tote items and no collectibles and free samples', (numberOfToteItems) => {
  cy.fixture('getNextTrip').then(function (_) {
    if (numberOfToteItems === '1') {
      _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0]];
      _.data.getNextTrip.totes = [_.data.getNextTrip.totes[0]];
    } else if (numberOfToteItems === '2') {
      _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0], _.data.getNextTrip.toteItems[1]];
      _.data.getNextTrip.totes = [_.data.getNextTrip.totes[0], _.data.getNextTrip.totes[1]];
    } else if (numberOfToteItems === '3') {
      _.data.getNextTrip.toteItems = [
        _.data.getNextTrip.toteItems[0],
        _.data.getNextTrip.toteItems[1],
        _.data.getNextTrip.toteItems[2],
      ];
      _.data.getNextTrip.totes = [_.data.getNextTrip.totes[0], _.data.getNextTrip.totes[1]];
    }

    _.data.getNextTrip.collectibles = [];
    _.data.getNextTrip.freeSamples = [];

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Given('I have a trip with only {} item', (collectibleOrFreeSample) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.toteItems = [];
    _.data.getNextTrip.totes = [_.data.getNextTrip.totes[2]];
    _.data.getNextTrip.orders = [_.data.getNextTrip.orders[0]];

    if (collectibleOrFreeSample.toLowerCase() === 'collectible') {
      _.data.getNextTrip.collectibles[0].toteId = '3';
      _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
      _.data.getNextTrip.freeSamples = [];
      _.data.getNextTrip.totes[0].orderNo = _.data.getNextTrip.collectibles[0].orderNo;
    } else {
      _.data.getNextTrip.freeSamples[0].toteId = '3';
      _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0]];
      _.data.getNextTrip.collectibles = [];
      _.data.getNextTrip.totes[0].orderNo = _.data.getNextTrip.freeSamples[0].orderNo;
    }

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

When('I click on No button', () => {
  cy.contains('NO').click();
});

When('I supply all items in the trip', () => {
  var numberOfItems = 0;
  cy.contains('/5')
    .invoke('text')
    .then((x) => {
      numberOfItems = x;
      cy.wrap(numberOfItems).as('numberOfItems');
    });
  cy.get('@numberOfItems').then((x) => {
    numberOfItems = x.substring(0, x.indexOf('/'));
    for (let i = 0; i < numberOfItems; i++) {
      cy.contains(/^ORD/)
        .next()
        .invoke('text')
        .then((x) => {
          var orderedQuantity = parseInt(x);
          cy.contains(/^SUP$/)
            .next()
            .invoke('text')
            .then((x) => {
              var suppliedQuantity = parseInt(x);
              if (orderedQuantity === suppliedQuantity) {
                cy.contains('FWD').click();
              } else {
                var quantity = (orderedQuantity - suppliedQuantity) * 1000;
                cy.get('[aria-label="manual scan"]').click();

                cy.get('input')
                  .parent()
                  .then(($a) => {
                    if ($a.text().includes('grams')) {
                      cy.contains('Enter the weight in grams').parent().find('input').clear().type(quantity);
                    }
                  });

                cy.contains('CONFIRM').click();

                cy.scanBarcode('140031688002');
              }
            });
        });
    }
  });
});

When('I click on Pack This Trolley button', () => {
  cy.contains('Pack this trolley').click();
});

When('I click No button', () => {
  cy.contains('No').click();
});

When('I click Yes button', () => {
  cy.contains('Yes').click();
});

Then('I should see goal time', () => {
  cy.fixture('getNextTrip').then(function (_) {
    var goalTime = Math.floor(parseInt(_.data.getNextTrip.goalTime) / 60);
    cy.contains('Goal time:').next().contains(goalTime).should('be.visible');
  });
});

Then('I should see pick time', () => {
  cy.fixture('getNextTrip').then(function (_) {
    var pickTime = Math.floor(parseInt(_.data.getNextTrip.elapsedTime) / 60);
    cy.contains('Pick time:').next().contains(pickTime).should('be.visible');
  });
});

Then('I should see Continue button', () => {
  cy.contains('Continue').should('be.visible').and('be.enabled');
});

Then('I should see the Unsupplied items popup', () => {
  cy.contains('Unsupplied items').should('be.visible');
});

Then('I verify the message on the Unsupplied items popup', () => {
  cy.contains('There are unsupplied items. Do you want to continue?').should('be.visible');
});

Then('I should see Yes and No buttons on the Unsupplied items popup', () => {
  cy.contains('Yes').should('be.visible').and('be.enabled');
  cy.contains('No').should('be.visible').and('be.enabled');
});

Then('I should be see the pre-final trip summary page', () => {
  cy.contains('No').should('not.exist');
  cy.contains('Pack this trolley').should('be.visible').and('be.enabled');
  cy.contains('Return to current line').should('be.visible').and('be.enabled');
});

Then('I should see the message {} text with tote {} to be removed', (message, totes) => {
  var regex = new RegExp(message + '$');
  cy.contains(regex).should('be.visible');
  cy.contains(totes).should('be.visible');
});
