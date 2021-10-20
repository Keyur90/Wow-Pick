import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I click on Reset current supplied', () => {
  cy.contains('Reset current supplied').click();
});

Then('I verify that Reset current supplied is visible and disabled', () => {
  cy.contains('Reset current supplied').should('be.visible').and('not.be.enabled');
});

Then('I verify that Reset current supplied is visible and enabled', () => {
  cy.contains('Reset current supplied').should('be.visible').and('not.be.disabled');
});

Then('I verify the warning message displayed on clicking Reset current supplied', function (table) {
  const data = table.rows();
  cy.contains(data[0][0]).should('be.visible');
  cy.contains(data[0][1]).should('be.visible');
});

Then('I verify that supplied quantity is {}', (suppliedQty) => {
  switch (suppliedQty) {
    case 'unchanged':
      cy.contains(/^SUP$/).next().contains(5).should('be.visible');
      break;
    case 'reset to zero':
      cy.contains(/^SUP$/).next().contains(0).should('be.visible');
      break;
    default:
      cy.contains(/^SUP$/).next().contains(suppliedQty).should('be.visible');
  }
});
