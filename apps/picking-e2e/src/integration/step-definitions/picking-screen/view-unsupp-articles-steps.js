import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I click on View unsupplied articles', () => {
  cy.contains('View unsupplied articles').click();
});

Then('I verify that the text All is present in the header', () => {
  cy.contains(/^All$/).should('be.visible');
});

Then('I verify that the text All is not present in the header', () => {
  cy.contains(/^All$/).should('not.exist');
});

Then('I verify that all articles are displayed in picking screen', () => {
  verifyAllArticles();
});

Then('I verify all unsupplied or partially supplied articles are displayed in picking screen', () => {
  verifyUnsuppliedArticles();
});

Then('I verify {} is visible', (label) => {
  cy.contains(label).should('be.visible');
});

function verifyAllArticles() {
  let expectedArticleIds = [];
  let expectedSecondaryArticleIds = [];

  // Get the number of articles and list of article ids from getNextTrip.json file
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.toteItems.forEach((element) => {
      expectedArticleIds.push(element.articleId);
      expectedSecondaryArticleIds.push(element.secondaryArticleId);
    });

    const leftInTripValuesRegex = new RegExp(`^[0-9]/${expectedArticleIds.length}$`);

    cy.contains(leftInTripValuesRegex).should('be.visible');

    verifyArticleIds(expectedArticleIds, expectedSecondaryArticleIds);
  });
}

function verifyUnsuppliedArticles() {
  let expectedArticleIds = [];
  let expectedSecondaryArticleIds = [];
  let totalSuppliedQty = 0;

  // Get the number of articles and list of article ids from getNextTrip.json file
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.toteItems.forEach((element) => {
      if (element.suppliedDetails.length === 0) {
        expectedArticleIds.push(element.articleId);
        expectedSecondaryArticleIds.push(element.secondaryArticleId);
      } else if (
        element.suppliedDetails[0].scanDetails[0].quantity != null &&
        element.suppliedDetails[0].scanDetails[0].quantity < element.orderedQuantity
      ) {
        expectedArticleIds.push(element.articleId);
        expectedSecondaryArticleIds.push(element.secondaryArticleId);
      } else if (
        element.suppliedDetails[0].scanDetails[0].weight != null &&
        element.suppliedDetails[0].scanDetails[0].weight.length > 0
      ) {
        element.suppliedDetails[0].scanDetails.forEach((supplyItem) => {
          totalSuppliedQty += parseInt(parseFloat(supplyItem.weight));
        });
        cy.log('total: ' + totalSuppliedQty);
        if (totalSuppliedQty < element.orderedQuantity) {
          expectedArticleIds.push(element.articleId);
          expectedSecondaryArticleIds.push(element.secondaryArticleId);
        }
      }
    });

    verifyArticleIds(expectedArticleIds, expectedSecondaryArticleIds);
  });
}

function verifyArticleIds(expectedArticleIds, expectedSecondaryArticleIds) {
  // Verify the actual articles displayed on UI
  expectedArticleIds.forEach((primaryArticleId, index) => {
    let secondaryArticleId = expectedSecondaryArticleIds[index];

    let primaryAndSecondaryArticleIdsRegex = secondaryArticleId
      ? new RegExp(`^${primaryArticleId}/${secondaryArticleId}$`)
      : new RegExp(`^${primaryArticleId}$`);

    cy.contains(primaryAndSecondaryArticleIdsRegex).should('be.visible');

    cy.contains('FWD').click();
  });
}
