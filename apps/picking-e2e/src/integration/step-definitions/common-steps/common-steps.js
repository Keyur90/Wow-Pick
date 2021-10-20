import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I click on Start Trip button', () => {
  cy.contains('Start trip').click();
});

When('I click Ok button on check last scanned item', () => {
  cy.contains('Ok').click();
});

When("I start it and click won't scan button for first item", () => {
  cy.contains('Start trip').click();
  cy.get('[aria-label="manual scan"]').click();
});

When('I click on More Options button', () => {
  cy.contains('More Options').click();
});

When('I click on Confirm button', () => {
  cy.contains(/^CONFIRM$/, { matchCase: false }).click();
});

And('I click on OK button', () => {
  cy.contains('OK', { matchCase: false }).click();
});

When('I scan the barcode {} to {}', (barcode) => {
  cy.scanBarcode(barcode);
});

And('I click on Close button', () => {
  cy.contains(/^Close$/).click();
});

And('I click on Yes button', () => {
  cy.contains(/^YES$/, { matchCase: false }).click();
});

And('I click on No button', () => {
  cy.contains(/^NO$/, { matchCase: false }).click();
});

When('I click on Cancel button', () => {
  cy.contains('CANCEL').click();
});

When('I click on FWD button', () => {
  cy.contains('FWD').click();
});

When('I click on Back button', () => {
  cy.contains('BACK').click();
});

When('I click on Wont Scan button', () => {
  cy.get('[aria-label="manual scan"]').click();
});

Then('I should validate the labels for article inventory information for {} article', (eachOrKg) => {
  if (eachOrKg === 'KG') {
    cy.contains(/^ORD \(KG\)$/).should('be.visible');
  } else {
    cy.contains(/^ORD \(EA\)$/).should('be.visible');
  }
  cy.contains(/^SUP$/).should('be.visible');
  cy.contains(/^SOH$/).should('be.visible');
});

And('I should verify the Order number and location and {}', (bagTypes) => {
  if (bagTypes === 'NO BAGS') {
    cy.contains('No Bags').should('be.visible').parent().should('have.css', 'background-color', 'rgb(189, 22, 28)');
  } else if (bagTypes === 'ONLINE BAG') {
    cy.contains('Plastic').should('be.visible').parent().should('have.css', 'background-color', 'rgb(0, 116, 188)');
  } else if (bagTypes === 'PAPER BAG') {
    cy.contains('Paper').should('be.visible').parent().should('have.css', 'background-color', 'rgb(41, 154, 83)');
  }
  cy.contains('ORDER NUMBER').should('be.visible');
  cy.contains('140031681').should('be.visible');
  cy.contains('#5');
});

Then('I should see "Trip Summary" in the page header', () => {
  cy.contains('Trip Summary').should('be.visible');
});

Then('I should validate that supplied quantity value is {}', (quantity) => {
  cy.contains(/^SUP$/).next().contains(quantity).should('be.visible');
});

Then('I should validate that supplied quantity is {}', (suppliedQty) => {
  cy.contains('SUP').next().contains(suppliedQty).should('be.visible');
});

Then('I should see the pop up with heading {} and text {}', (header, text) => {
  cy.contains(header).should('be.visible');
  cy.contains(text).should('be.visible');
});

Then(
  /I should be navigated to the (?:next|previous|first|last|last unsupplied) article in the trip with header displaying (.*)/,
  (header) => {
    var leftInTrip = header.substring(0, 3);
    var text = header.substring(1, 3);
    cy.contains(text)
      .invoke('text')
      .then((x) => {
        expect(x).to.eq(leftInTrip);
      });
    cy.contains('left in trip').should('be.visible');
  }
);
Then('I should be navigated to the picking screen of the next article', () => {
  cy.contains('Lines incomplete').should('be.visible');
  cy.contains('Pack this trolley').should('be.visible');
});

Then('I should see the {} screen', (header) => {
  cy.contains(header).should('be.visible');
});
