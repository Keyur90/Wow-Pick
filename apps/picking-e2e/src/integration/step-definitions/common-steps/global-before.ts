import { Before } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.wrap({}).as('testCaseScopedState');

  cy.interceptGql('/graphql', {
    getPEBConfigs: { fixture: 'getPEBConfigs' },
    getPrintersPoolList: { fixture: 'getPrintersPoolList' },
    printToteLabels: { fixture: 'printToteLabels' },
    updateElapsedTime: { fixture: 'updateElapsedTimeSuccess' },
    supplyToteItem: { fixture: 'supplyToteItemSuccess' },
    supplyCollectibles: { fixture: 'supplyCollectiblesSuccess' },
    supplyFreeSamples: { fixture: 'supplyFreeSamplesSuccess' },
  });
});
