describe("Login", () => {
   it("successfully logging in", () => {
        const user = Cypress.env("user_name");
        const password = Cypress.env("user_password");
        const options = { cacheSession: false }; // forces the test to execute the login command other than using an existent session

        cy.login(user, password, options);
        
        cy.get('.qa-user-avatar').should('be.visible')
    });
});
