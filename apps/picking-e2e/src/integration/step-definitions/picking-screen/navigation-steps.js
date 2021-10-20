import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I resume a trip with 3 tote items with 2 collectibles and 2 free samples', () => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.isNewTrolley = false;
    _.data.getNextTrip.toteItems = [
      _.data.getNextTrip.toteItems[0],
      _.data.getNextTrip.toteItems[1],
      _.data.getNextTrip.toteItems[2],
    ];

    _.data.getNextTrip.toteItems[0].suppliedDetails = [
      {
        type: 'primary',
        articleId: '28391',
        scanDetails: [
          {
            storePrice: null,
            barcode: '',
            suppliedPrice: 0,
            quantity: 1,
            weight: null,
            batchNo: '',
            expiryDate: '',
            dataBar: '',
            __typename: 'ScanDetail',
          },
        ],
        __typename: 'SuppliedDetail',
      },
    ];

    _.data.getNextTrip.collectibles[0].suppliedQuantity = 1;
    _.data.getNextTrip.freeSamples[0].suppliedQuantity = 1;

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

When('I click on Return to current line button', () => {
  cy.contains('Return to current line').click();
});

Then('I should be navigated to {} screen', (screen) => {
  if (screen.toLowerCase() === 'collectibles') {
    cy.contains('Collectibles').should('be.visible');
    cy.contains('Close').should('be.visible').and('be.enabled');
    cy.contains('OK').should('be.visible').and('be.enabled');
  } else if (screen.toLowerCase() === 'free samples') {
    cy.contains('Free Samples').should('be.visible');
    cy.contains('NO').should('be.visible').and('be.enabled');
    cy.contains('YES').should('be.visible').and('be.enabled');
  }
});

Then('I verify the articleId {} for collectible displayed', (articleId) => {
  cy.contains(articleId).should('be.visible');
});
