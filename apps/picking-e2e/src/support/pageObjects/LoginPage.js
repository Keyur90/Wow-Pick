class LoginPage {
  ensureLoaded() {
    cy.frameLoaded({ url: "/Login.htm" });
  }

  storeNoTxt() {
    return cy.iframe().find("#store-no");
  }
  userNameTxt() {
    return cy.iframe().find("#user-name");
  }
  loginBtn() {
    return cy.iframe().find("#login-btn");
  }

  okButton() {
    return cy.iframe().find("#ok-btn");
  }

  errorTxt() {
    return cy.iframe().find("#message");
  }

  passwordTxt() {
    return cy.iframe().find("#password");
  }
}

export default LoginPage;
