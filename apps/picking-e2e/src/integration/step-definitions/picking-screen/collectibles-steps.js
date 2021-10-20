import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I have trip with 1 Tote item, 1 collectible with {} as ordered quantity', (quantity) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0]];
    _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];

    const firstItem = _.data.getNextTrip.collectibles[0];
    firstItem.orderedQuantity = quantity;

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});
And('I enter {} as valid quantity for collectibles', (quantity) => {
  cy.contains('Enter the supplied quantity').parent().find('input').clear().type(quantity).blur();
});

And('I should validate the {}, order number and location', (bagTypes) => {
  if (bagTypes === 'NO BAGS') {
    cy.contains('No Bags').should('be.visible').parent().should('have.css', 'background-color', 'rgb(189, 22, 28)');
  } else if (bagTypes === 'ONLINE BAG') {
    cy.contains('Plastic').should('be.visible').parent().should('have.css', 'background-color', 'rgb(0, 116, 188)');
  } else if (bagTypes === 'PAPER BAG') {
    cy.contains('Paper').should('be.visible').parent().should('have.css', 'background-color', 'rgb(41, 154, 83)');
  }
  cy.contains('ORDER NUMBER').should('be.visible');
  cy.contains('140031681').should('be.visible');
  cy.contains('#5');
});

Then('I should see the error pop-up with message {}', (errorMsg) => {
  cy.contains('Label Scan').should('be.visible');
  cy.contains(errorMsg).should('be.visible');
});

Then('I should see the tote pop up but no message to scan', () => {
  cy.contains('Scan tote label to continue').should('not.exist');
  cy.contains(/^Place the items? into the tote$/).should('be.visible');
});

Then('I should validate the labels for collectibles', () => {
  cy.contains('ORD').should('be.visible');
  cy.contains(/^SUP$/).should('be.visible');
  cy.contains(/^SOH$/).should('be.visible');
});
