import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I have trip with first tote item with article location {} {} {}', (aisle, bay, shelf) => {
  cy.fixture('getNextTrip').then(function (_) {
    const firstItem = _.data.getNextTrip.toteItems[0];
    firstItem.aisle = aisle;
    firstItem.bay = bay;
    firstItem.shelf = shelf;

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Then('I verify the article location {} {} {} is displayed', (aisle, bay, shelf) => {
  cy.get('.MuiTypography-h1').should('have.text', 'A' + aisle + '-' + 'B' + bay + '-' + ' ' + 'S' + shelf);
});

And('I verify the navigation, pick progress with text {}', (pickProgressMsg) => {
  cy.contains(pickProgressMsg).should('be.visible');
});
