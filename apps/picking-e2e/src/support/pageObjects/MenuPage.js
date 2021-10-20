class MenuPage {
  ensureLoaded() {
    cy.frameLoaded({ url: "/TrolleyMain.htm" });
  }

  nextTrolleyTripGoBtn() {
    return cy
      .iframe()
      .find('#frm-menu a:has(span:contains("Next Trolley Trip"))');
  }
}
export default MenuPage;
