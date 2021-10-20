import { And, Given, When } from 'cypress-cucumber-preprocessor/steps';

const defaultStore = '1752';
const defaultUserName = '1752.12';
const tripType_Normal = 'normal';
const defaultFeatureFlags = {
  isRfRedesignPickToPictureEnabled: true,
  showExpiryDateInfo: true,
};

Given('I successfully login to RF application', function () {
  cy.on('window:before:load', (win) => {
    win.__e2e = {};
    win.__e2e.globalState = {
      userContext: { userName: defaultUserName, branchNo: defaultStore },
      featureFlags: defaultFeatureFlags,
      trolleyType: tripType_Normal,
    };
  });
});

Given('I successfully login to RF application with databar scan enabled', function () {
  cy.on('window:before:load', (win) => {
    win.__e2e = {};
    win.__e2e.globalState = {
      userContext: { userName: defaultUserName, branchNo: defaultStore },
      featureFlags: {
        isRfRedesignPickToPictureEnabled: true,
        showExpiryDateInfo: true,
        isDataBarEnabled: true,
      },
      trolleyType: tripType_Normal,
    };
  });
});

Given(
  'I successfully login to RF application with {} and {} flags',
  function (showToteDialogForExpress, canSkipToteBarcodeScan) {
    cy.on('window:before:load', (win) => {
      win.__e2e = {};
      win.__e2e.globalState = {
        userContext: { userName: defaultUserName, branchNo: defaultStore },
        featureFlags: {
          isRfRedesignPickToPictureEnabled: true,
          showExpiryDateInfo: true,
          showToteDialogForExpress: showToteDialogForExpress === 'true' ? true : false,
          canSkipToteBarcodeScan: canSkipToteBarcodeScan === 'true' ? true : false,
        },
        trolleyType: tripType_Normal,
      };
    });
  }
);

Given('I successfully login to RF application with user name {} and store {} ', function (userName, store) {
  cy.on('window:before:load', (win) => {
    win.__e2e = {};
    win.__e2e.globalState = {
      userContext: { userName: userName, branchNo: store },
      featureFlags: defaultFeatureFlags,
      trolleyType: tripType_Normal,
    };
  });
});

Given('I have trip with {} tote item of type {} and ordered quantity {}', (itemNo, eachOrKg, quantity) => {
  cy.fixture('getNextTrip').then(function (_) {
    var toteItem = null;

    if (itemNo === 'first') {
      toteItem = _.data.getNextTrip.toteItems[0];
    } else if (itemNo === 'second') {
      toteItem = _.data.getNextTrip.toteItems[1];
    }
    if (eachOrKg === 'KG') {
      toteItem.article.pricingUnit = eachOrKg;
    } else {
      toteItem.article.pricingUnit = 'EACH';
      if (eachOrKg === 'Weight Range') {
        toteItem.article.useWeightRange = true;
        toteItem.article.minWeight = 2;
        toteItem.article.maxWeight = 3;
      } else if (eachOrKg === 'EACH Multiplier') {
        toteItem.article.eachMultiplier = '0.14';
      }
    }

    toteItem.orderedQuantity = eachOrKg === 'Weight Range' ? 1 : quantity;

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
});

Given(
  'I have a trip with {} tote item of type {} and ordered quantity {} with actual weight override flag {}',
  (itemNo, eachOrKg, quantity, weightOverrideFlag) => {
    cy.fixture('getNextTrip').then(function (_) {
      var toteItem = null;

      if (itemNo === 'first') {
        toteItem = _.data.getNextTrip.toteItems[0];
      } else if (itemNo === 'second') {
        toteItem = _.data.getNextTrip.toteItems[1];
      }

      toteItem.article.weightOverride = weightOverrideFlag === 'true' ? true : false;

      if (eachOrKg === 'KG') {
        toteItem.article.pricingUnit = eachOrKg;
      } else {
        toteItem.article.pricingUnit = 'EACH';
        if (eachOrKg === 'Weight Range') {
          toteItem.article.useWeightRange = true;
          toteItem.article.minWeight = 2;
          toteItem.article.maxWeight = 3;
        }
      }

      toteItem.orderedQuantity = quantity;

      cy.interceptGql('/graphql', {
        getNextTrip: { body: _ },
      });
    });
  }
);

Given(
  'I have trip {} with first tote item of type {} with ordered quantity {} and {}',
  (isExpress, eachOrKg, quantity, bagTypes) => {
    cy.fixture('getNextTrip').then(function (_) {
      _.data.getNextTrip.isExpress = isExpress === 'true' ? true : false;
      const firstItem = _.data.getNextTrip.toteItems[0];
      const orderDetails = _.data.getNextTrip.orders[0];
      firstItem.article.pricingUnit = eachOrKg;
      firstItem.orderedQuantity = quantity;
      orderDetails.packagingType = bagTypes;

      cy.interceptGql('/graphql', {
        getNextTrip: { body: _ },
      });
    });
  }
);

Given(
  'I have trip {} with 2 tote items of type {} with same {} and ORD 3 and {}',
  (isExpress, eachOrKg, orderNumber, bagTypes) => {
    cy.fixture('getNextTrip').then(function (_) {
      _.data.getNextTrip.isExpress = isExpress === 'true' ? true : false;
      const firstItem = _.data.getNextTrip.toteItems[0];
      const secondItem = _.data.getNextTrip.toteItems[1];
      const orderDetails = _.data.getNextTrip.orders[0];
      firstItem.article.pricingUnit = eachOrKg;
      orderDetails.packagingType = bagTypes;
      firstItem.orderNo = orderNumber;
      secondItem.orderNo = orderNumber;

      cy.interceptGql('/graphql', {
        getNextTrip: { body: _ },
      });
    });
  }
);

const getDefaultTrip = function (trolleyType) {
  const isBulk = trolleyType.toLowerCase() === 'bulk';

  cy.log(isBulk);

  cy.fixture('getNextTrip').then((_) => {
    _.data.getNextTrip.isBulk = isBulk;
    _.data.getNextTrip.isExpress = !isBulk;

    cy.interceptGql('/graphql', {
      getNextTrip: { body: _ },
    });
  });
};

And(/have (bulk|express) trip/, getDefaultTrip);
Given(/I have (bulk|express) trip/, getDefaultTrip);
Given(/I have (bulk|express) trip with 4 totes, 5 articles and 4 labels/, getDefaultTrip);
Given(/I have (bulk|express) trip with 5 articles/, getDefaultTrip);

When('I get this trip', function () {
  cy.visit('/'); // calling visit without hostname will use the baseUrl, baseUrl is defined in workspace.json file
});

And(
  'I have trip {} with 1 tote item, 1 collectible with ordered quantity {} and bagType as {}',
  (isExpress, quantity, bagTypes) => {
    cy.fixture('getNextTrip').then(function (_) {
      _.data.getNextTrip.isExpress = isExpress === 'true' ? true : false;
      _.data.getNextTrip.toteItems = [_.data.getNextTrip.toteItems[0]];
      _.data.getNextTrip.collectibles = [_.data.getNextTrip.collectibles[0]];
      const orderDetails = _.data.getNextTrip.orders[0];
      orderDetails.packagingType = bagTypes;
      const firstItem = _.data.getNextTrip.collectibles[0];
      firstItem.orderedQuantity = quantity;

      cy.interceptGql('/graphql', {
        getNextTrip: { body: _ },
      });
    });
  }
);
