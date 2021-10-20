import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I have trip with first tote item with personal shopper notes {}', (notes) => {
  cy.fixture('getNextTrip').then(function (_) {
    const firstItem = _.data.getNextTrip.toteItems[0];
    firstItem.personalShopperNotes = notes;

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

When('I click on notes {}', (notes) => {
  cy.contains(notes).click();
});

When('I close the Customer Note popup', () => {
  cy.contains('Close').click();
});

Then('I should be able to see the article picking screen', () => {
  cy.contains('Customer Note').should('not.exist');
  cy.contains(/^SUP$/).should('be.visible');
});

Then('I should see a popup containing {}', (notes) => {
  cy.contains('Customer Note').should('be.visible');
  cy.contains(notes).should('be.visible');
  cy.contains('Close').should('be.visible');
});

Then('I verify the notes {} is displayed', (notes) => {
  cy.contains(notes).should('be.visible');
});

Then(/I should validate the picking trip buttons - (?:primary|secondary)/, function (labels) {
  verifyLabels(labels);
});

function verifyLabels(labels) {
  const data = labels.rows();
  data.forEach((element) => {
    if (String(element) === 'Wont Scan') {
      cy.get('[aria-label="manual scan"]').should('be.visible');
    } else {
      cy.contains(String(element)).should('be.visible');
    }
  });
}
