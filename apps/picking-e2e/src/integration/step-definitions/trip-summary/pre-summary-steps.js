import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I have a trip with only {} collectibles and {} free samples', (noOfCollectibles, noOfFreeSamples) => {
  cy.fixture('getNextTrip').then(function (_) {
    _.data.getNextTrip.toteItems = [];
    _.data.getNextTrip.totes = [_.data.getNextTrip.totes[2]];
    _.data.getNextTrip.orders = [_.data.getNextTrip.orders[0]];

    if (noOfCollectibles === '0') {
      _.data.getNextTrip.collectibles = [];
    } else if (noOfCollectibles === '1') {
      _.data.getNextTrip.collectibles[0].toteId = '3';
      _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
    } else if (noOfCollectibles === '2') {
      _.data.getNextTrip.collectibles[0].toteId = '3';
      _.data.getNextTrip.collectibles[1].toteId = '3';
      _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0], _.data.getNextTrip.collectibles[1]];
    }

    if (noOfFreeSamples === '0') {
      _.data.getNextTrip.freeSamples = [];
    } else if (noOfFreeSamples === '1') {
      _.data.getNextTrip.freeSamples[0].toteId = '3';
      _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0]];
    } else if (noOfFreeSamples === '2') {
      _.data.getNextTrip.freeSamples[0].toteId = '3';
      _.data.getNextTrip.freeSamples[1].toteId = '3';
      _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0], _.data.getNextTrip.freeSamples[1]];
    }

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Given(
  'I have a trip with {} tote items with {} collectibles and {} free samples',
  (noOfToteItems, noOfCollectibles, noOfFreeSamples) => {
    cy.fixture('getNextTrip').then(function (_) {
      if (noOfToteItems === '0') {
        _.data.getNextTrip.toteItems = [];
      } else if (noOfToteItems === '1') {
        _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0]];
      } else if (noOfToteItems === '2') {
        _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0], _.data.getNextTrip.toteItems[1]];
      } else if (noOfToteItems === '3') {
        _.data.getNextTrip.toteItems = [
          _.data.getNextTrip.toteItems[0],
          _.data.getNextTrip.toteItems[1],
          _.data.getNextTrip.toteItems[2],
        ];
      }

      if (noOfCollectibles === '0') {
        _.data.getNextTrip.collectibles = [];
      } else if (noOfCollectibles === '1') {
        _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
      } else if (noOfCollectibles === '2') {
        _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0], _.data.getNextTrip.collectibles[1]];
      }

      if (noOfFreeSamples === '0') {
        _.data.getNextTrip.freeSamples = [];
      } else if (noOfFreeSamples === '1') {
        _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0]];
      } else if (noOfFreeSamples === '2') {
        _.data.getNextTrip.freeSamples = [_.data.getNextTrip.freeSamples[0], _.data.getNextTrip.freeSamples[1]];
      }

      cy.interceptGql('/graphql', {
        getNextTrip: { body: _ },
      });
    });
  }
);

When('I supply {} quantity of collectible item', (quantity) => {
  cy.contains('Enter the supplied quantity').next().clear().type(quantity);
});

Then('I verify pre-summary page is displayed', () => {
  cy.contains('Lines incomplete:').should('be.visible');
  cy.contains('Pack this trolley').prev().contains('Return to current line');
});

Then('I verify the {} Lines incomplete and {} substituted in pre-summary page', (linesIncomplete, substituted) => {
  cy.contains('Lines incomplete:').next().contains(linesIncomplete);
});

Then('I verify {} button is {}', (buttonName, isEnabled) => {
  if (buttonName.toLowerCase() === 'return to current line') {
    if (isEnabled.toLowerCase() === 'enabled') {
      cy.contains('Return to current line').should('be.visible').and('be.enabled');
    } else {
      cy.contains('Return to current line').should('be.visible').and('not.be.enabled');
    }
  } else if (buttonName.toLowerCase() === 'pack this trolley') {
    if (isEnabled.toLowerCase() === 'enabled') {
      cy.contains('Pack this trolley').should('be.visible').and('be.enabled');
    } else {
      cy.contains('Pack this trolley').should('be.visible').and('not.be.enabled');
    }
  }
});
