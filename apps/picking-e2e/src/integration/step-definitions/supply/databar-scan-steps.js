import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('I verify that a pop up is displayed stating article is below the limit', () => {
  cy.contains('Supplied weight').should('be.visible');
  cy.contains('Article is below the limit - select an alternative').should('be.visible');
  cy.contains(/^Close$/)
    .should('be.visible')
    .and('be.enabled');
});

Then('I verify that the pop up is closed', () => {
  cy.contains('Supplied weight').should('not.exist');
});

Then('I verify the modal pop up displayed stating article exceeds tolerance', () => {
  cy.contains('Supplied weight').should('be.visible');
  cy.contains('Article exceeds tolerance, press Confirm to keep or Close to select an alternative').should(
    'be.visible'
  );
  cy.contains(/^Confirm$/)
    .should('be.visible')
    .and('be.enabled');
  cy.contains(/^Close$/)
    .should('be.visible')
    .and('be.enabled');
});

Then('I verify that a pop up is displayed stating article exceeds tolerance', () => {
  cy.contains('Supplied weight').should('be.visible');
  cy.contains('Article exceeds tolerance - select an alternative').should('be.visible');
  cy.contains(/^Close$/)
    .should('be.visible')
    .and('be.enabled');
});
