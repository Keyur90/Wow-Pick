import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given(
  'I have {} trip with 1 Tote item, 1 collectible and 1 free sample with description {} and bag Type {}',
  (isExpress, desc, bagTypes) => {
    cy.fixture('getNextTrip').then(function (_) {
      _.data.getNextTrip.isExpress = isExpress === 'true' ? true : false;
      _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0]];
      _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
      _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0]];
      _.data.getNextTrip.freeSamples[0].description = desc;
      _.data.getNextTrip.orders[0].packagingType = bagTypes;

      cy.interceptGql('/graphql', {
        getNextTrip: { body: _ },
      });
    });
  }
);

Given('I have {} trip with 1 Tote item, 1 collectible and 1 free sample with bag Type {}', (isExpress, bagTypes) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.isExpress = isExpress === 'true' ? true : false;
    _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0]];
    _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
    _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0]];
    _.data.getNextTrip.orders[0].packagingType = bagTypes;

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Given('I have {} trip with 1 Tote item, 1 collectible and 1 free sample', (isExpress) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.isExpress = isExpress === 'true' ? true : false;
    _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0]];
    _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
    _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0]];

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Then('I should see the title of free samples and details {} with tote and the bag type {}', (desc, bagTypes) => {
  cy.contains('Free Samples').should('be.visible');
  cy.contains('Please add this free sample to').should('be.visible');
  cy.contains(desc).should('be.visible');
  if (bagTypes === 'NO BAGS') {
    cy.contains('No Bags').should('be.visible').parent().should('have.css', 'background-color', 'rgb(189, 22, 28)');
  } else if (bagTypes === 'ONLINE BAG') {
    cy.contains('Plastic').should('be.visible').parent().should('have.css', 'background-color', 'rgb(0, 116, 188)');
  } else if (bagTypes === 'PAPER BAG') {
    cy.contains('Paper').should('be.visible').parent().should('have.css', 'background-color', 'rgb(41, 154, 83)');
  }
});
