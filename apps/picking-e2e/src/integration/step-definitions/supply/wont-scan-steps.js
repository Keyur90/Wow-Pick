import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';

When(/I enter (.*) as supplied quantity for a (?:KG|Weight Range) article/, (quantity) => {
  cy.contains('Enter the weight in grams').parent().find('input').clear().type(quantity);
});

And('I enter {} as invalid quantity', (invalidQuantity) => {
  cy.contains('Enter the supplied quantity').parent().find('input').clear().type(invalidQuantity).blur();
});

And('I enter {} as valid quantity', (validQuantity) => {
  cy.get('#suppliedQuantity').clear().type(validQuantity);
});

When('I re-enter {} as supplied quantity', (quantity) => {
  cy.contains('Enter the weight again to confirm').parent().find('input').clear().type(quantity);
});

When('I click on OK button', () => {
  cy.contains(/^OK$/).click();
});

Then('I should see an error message with min quantity more than 0 and not more than {}', (maxQuantity) => {
  cy.contains(`Please enter a quantity, more than 0, not more than ${maxQuantity}`).should('be.visible');
});

Then('I should be able to click confirm', () => {
  cy.contains('CONFIRM').should('be.visible').and('be.enabled');
  cy.contains(/^ORD \(EA\)$/)
    .next()
    .contains(5)
    .should('be.visible');
});

Then('I should see an error message to enter valid quantity', () => {
  cy.contains(`Please enter a valid quantity`).should('be.visible');
});

Then('I validate the modal popup displayed for {} article', (eachOrKG) => {
  if (eachOrKG === 'EACH') {
    cy.contains('Enter the supplied quantity').parent().find('input').clear().type(1).blur();
  } else {
    cy.contains('Enter the weight in grams').parent().find('input').clear().type(1).blur();
    cy.contains(/^g$/).parent().parent().find('#suppliedQuantity').clear().type(1).blur();
  }
  verifyConfirmAndCancelButtonIsEnabled();
});

Then('I should see an error message for {} value', (data) => {
  cy.contains('Enter the weight in grams').should('have.css', 'color', 'rgb(244, 67, 54)');

  if (data === 'zero' || data === 'negative') {
    cy.contains('Please enter a quantity, more than 0')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(244, 67, 54)');
  } else if (data === 'non-numeric') {
    cy.contains('Please enter a valid quantity').should('be.visible').and('have.css', 'color', 'rgb(244, 67, 54)');
  } else if (data === 'decimal') {
    cy.contains('Decimals not allowed').should('be.visible').and('have.css', 'color', 'rgb(244, 67, 54)');
  }

  verifyConfirmAndCancelButtonIsEnabled();
});

Then('I should see a popup stating that maximum quantity is already supplied', () => {
  cy.contains('Supplied Quantity').should('be.visible');
  cy.contains('Article maximum qty already supplied').should('be.visible');
  cy.contains('Close').should('be.visible').and('be.enabled');
});

Then('I verify the modal popup displayed to confirm {} supplied', (suppliedWeight) => {
  cy.contains('Previously supplied weight exceeds primary tolerance')
    .should('be.visible')
    .and('have.css', 'color', 'rgb(255, 152, 0)');
  cy.contains('Confirm to keep ' + suppliedWeight + 'g or cancel to select an alternative').should('be.visible');
});

Then('I verify the pop up displayed stating {} exceeds secondary tolerance', (suppliedWeight) => {
  cy.contains('Previously supplied weight (' + suppliedWeight + 'g) exceeds secondary tolerance')
    .should('be.visible')
    .and('have.css', 'color', 'rgb(244, 67, 54)');
  cy.contains('Enter the weight again to confirm').parent().find('input').should('have.value', '');
  cy.contains(/^g$/).parent().parent().find('input').should('have.value', '');
  verifyConfirmAndCancelButtonIsEnabled();
});

Then('I verify the popup displayed stating the weights do not match', () => {
  cy.contains('Order').should('be.visible');
  cy.contains('Weights do not match, press OK to start again');
  cy.contains(/^OK$/).should('be.visible').and('be.enabled');
});

Then('I verify the inline error {} stating that tolerance is exceeded', (errorMessage) => {
  cy.contains('Enter the weight in grams').should('have.css', 'color', 'rgb(244, 67, 54)');
  cy.contains(errorMessage).should('be.visible').and('have.css', 'color', 'rgb(244, 67, 54)');
});

Then('I verify that an inline error message is displayed stating article is below the limit', () => {
  cy.contains('Enter the weight in grams').should('have.css', 'color', 'rgb(244, 67, 54)');
  cy.contains('Article is below the limit - select an alternative')
    .should('be.visible')
    .and('have.css', 'color', 'rgb(244, 67, 54)');
});

function verifyConfirmAndCancelButtonIsEnabled() {
  cy.contains('CONFIRM').should('be.visible').and('be.enabled');
  cy.contains('CANCEL').should('be.visible').and('be.enabled');
}
