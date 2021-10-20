class TripSummaryPage {
  ensureLoaded() {
    cy.frameLoaded({ url: '/TrolleyMain.htm' });
  }
  bulkTrolleyTxt() {
    return cy.contains('li', 'Bulk Trolley Trip');
  }
  tripSummaryTxt() {
    return cy.contains('h1', 'Trip Summary');
  }
  totesTxt() {
    return cy.contains('span', 'Totes');
  }
  totesCount() {
    return cy.contains('span', 'Totes').siblings('span');
  }
  articlesTxt() {
    return cy.contains('span', 'Articles');
  }
  articlesCount() {
    return cy.contains('span', 'Articles').siblings('span');
  }
  labelsTxt() {
    return cy.contains('span', 'Labels');
  }
  labelsCount() {
    return cy.contains('span', 'Labels').siblings('span');
  }
  goalTimeTxt() {
    return cy.contains('span', 'Goal Time');
  }
  startTripBtn() {
    return cy.contains('span', 'Start trip');
  }
  reprintBtn() {
    return cy.contains('span', 'Reprint labels');
  }
  bagTypeTxt() {
    return cy.contains('span', 'Bag type');
  }
}
export default TripSummaryPage;
