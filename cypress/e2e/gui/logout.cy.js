describe("Logout", () => {
    it("successfully logging out", () => {
        cy.login();
        cy.visit("/");

        cy.logout();

        cy.url().should("eq", `${Cypress.config('baseUrl')}/users/sign_in`);
    });
  });
  