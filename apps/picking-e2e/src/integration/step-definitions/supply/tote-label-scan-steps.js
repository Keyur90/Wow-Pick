import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I click on Close button', () => {
  cy.contains('Close').click();
});

Then('I should see the pop up to scan the tote label', () => {
  cy.contains('Scan tote label to continue').should('be.visible');
});

Then('I should see the tote pop up, but no message to scan for article {}', (eachOrKG) => {
  cy.contains('Scan tote label to continue').should('not.exist');
  if (eachOrKG === 'KG') {
    cy.contains('Place' + eachOrKG + 'items into the tote').should('be.visible');
  } else if (eachOrKG === 'EACH') {
    cy.contains('Place the item(s) into the tote').should('be.visible');
  }
});

Then('I should not see the pop up to scan the tote label', () => {
  cy.contains('Scan tote label to continue').should('not.exist');
  cy.contains('into the tote').should('not.exist');
});

Then('I should not see the pop up to scan the tote label', () => {
  cy.contains('Scan tote label to continue').should('not.exist');
});

Then('I should verify that a popup with header {} and text {} is displayed', (header, text) => {
  cy.contains(header).should('be.visible');
  cy.contains(text).should('be.visible');
});

Then('I should see the Close button', () => {
  cy.contains('Close').should('be.visible');
});

Then('I should be navigated to Place items to tote popup for a {} article', (eachOrKG) => {
  if (eachOrKG === 'EACH') {
    cy.contains(/^Place \d items? into the tote$/).should('be.visible');
  } else if (eachOrKG == 'KG') {
    cy.contains(/^Place the items? into the tote$/).should('be.visible');
  }
  cy.contains('Scan tote label to continue').should('be.visible');
});

And('I should validate the number of totes', () => {
  cy.contains('Tote 1').should('be.visible');
});

And(
  'I should validate the {}, placed items as {}, order number based on {} and location',
  (bagTypes, quantity, eachOrKG) => {
    if (bagTypes === 'NO BAGS') {
      cy.contains('No Bags').should('be.visible').parent().should('have.css', 'background-color', 'rgb(189, 22, 28)');
    } else if (bagTypes === 'ONLINE BAG') {
      cy.contains('Plastic').should('be.visible').parent().should('have.css', 'background-color', 'rgb(0, 116, 188)');
    } else if (bagTypes === 'PAPER BAG') {
      cy.contains('Paper').should('be.visible').parent().should('have.css', 'background-color', 'rgb(41, 154, 83)');
    }
    if (eachOrKG === 'EACH') {
      cy.contains(/^Place \d items? into the tote$/).should('be.visible');
    } else if (eachOrKG === 'KG') {
      cy.contains(/^Place the items? into the tote$/).should('be.visible');
    }
    cy.contains('ORDER NUMBER').should('be.visible');
    cy.contains('140031681').should('be.visible');
    cy.contains('#5');
  }
);
