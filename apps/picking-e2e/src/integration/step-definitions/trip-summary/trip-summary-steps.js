import { And } from 'cypress-cucumber-preprocessor/steps';

And('I should see "Bulk Trolley Trip" title', () => {
  cy.contains('Bulk Trolley Trip').should('be.visible');
});

And('I should see totes, articles and labels count to be {}, {}, {}', (totesCount, articlesCount, labelsCount) => {
  cy.contains('Totes:').should('be.visible').next().contains(totesCount).should('be.visible');
  cy.contains('Articles:').should('be.visible').next().contains(articlesCount).should('be.visible');
  cy.contains('Labels:').should('be.visible').next().contains(labelsCount).should('be.visible');
});

And('I should see articles count to be {}', (articlesCount) => {
  cy.contains('Articles:').should('be.visible').next().contains(articlesCount).should('be.visible');
});

And('I should see "No tote labels needed" title', () => {
  cy.contains('No tote labels needed').should('be.visible');
});

And("I should see bag type to be 'No Bags' and displayed in red color", () => {
  cy.contains('Bag type:')
    .should('be.visible')
    .next()
    .contains('No Bags')
    .should('be.visible')
    .parent()
    .should('have.css', 'background-color', 'rgb(189, 22, 28)'); // Red Color
});

And('I should see goal time is {}', (goalTime) => {
  cy.contains('Goal Time:').next().contains(goalTime).should('be.visible');
});
