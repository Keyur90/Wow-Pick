import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I have trip with first tote item of type {} and stock on hand value {}', (eachOrKg, soh) => {
  cy.fixture('getNextTrip').then(function (_) {
    const firstItem = _.data.getNextTrip.toteItems[0];
    firstItem.article.pricingUnit = eachOrKg;
    firstItem.stockOnHand = soh;

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Given('I have a trip with a collectible item of {} pricing unit', (pricingUnit) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0]];
    _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
    _.data.getNextTrip.freeSamples = [];

    if (pricingUnit === 'KG') {
      _.data.getNextTrip.collectibles[0].article.pricingUnit = 'KG';
    } else {
      _.data.getNextTrip.collectibles[0].article.pricingUnit = 'EACH';
    }

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Then('I should validate that stock on hand value is {}', (quantity) => {
  cy.contains(/^SOH$/).next().contains(quantity).should('be.visible');
});

Then('I verify the labels displayed in picking screen for free sample item', () => {
  cy.contains(/^ORD/).should('not.exist');
  cy.contains(/^SUP$/).should('not.exist');
  cy.contains(/^SOH$/).should('not.exist');
});
