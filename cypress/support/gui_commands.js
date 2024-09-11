Cypress.Commands.add("login", (
    user = Cypress.env("user_name"),
    password = Cypress.env("user_password"),
    { cacheSession = true } = {},
) => {
    const login = () => {
        cy.visit("users/sign_in");

        cy.get("#user_login")
            .should("be.visible")
            .click()
            .type(user);
        cy.get("#user_password")
            .should("be.visible")
            .click()
            .type(password, { log: false });
        cy.get("[data-qa-selector='sign_in_button']")
            .should("be.visible")
            .should("have.value", "Sign in")
            .click();
    };

    const validate = () => { // verifies if the current page is the sign in page. if so, logs in again
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 }).should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    };

    if (cacheSession) { // allows tests (other than the login one) to use an existent session, saving time
        cy.session(user, login, options)
    } else {
        login();
    };
});

Cypress.Commands.add("logout", () => {
    const logout = () => {
        cy.get(".header-user-avatar")
            .should("be.visible")
            .click();
        cy.contains("Sign out").click();
    };

    logout();
});

Cypress.Commands.add("gui_create_blank_project", project => {
    const gui_create_blank_project = () => {
        cy.visit("/projects/new");

        cy.get("#project_name")
            .should("be.visible")
            .click()
            .type(project.name);
        cy.get("#project_description")
            .should("be.visible")
            .click()
            .type(project.description);
        cy.get("#project_initialize_with_readme")
            .should("be.visible")
            .check();
        cy.get('#blank-project-pane > #new_project > .btn-success')
            .should("be.visible")
            .click();
    };   

    gui_create_blank_project();
});

Cypress.Commands.add("gui_create_issue", issue => {
    const gui_create_issue = () => {
        cy.visit(`${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${issue.project_infos.name}/issues`);

        cy.get("#new_issue_link")
            .should("be.visible")
            .click();
        cy.get("#issue_title")
            .should("be.visible")
            .click()
            .type(issue.title);
        cy.get("#issue_description")
            .should("be.visible")
            .click()
            .type(issue.description);
        cy.get(".append-right-10 > .btn")
            .should("be.visible")
            .click();
    };

    gui_create_issue();
});

Cypress.Commands.add("gui_create_label", issue_infos => {
    const gui_create_label = () => {
        cy.visit(`${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${issue_infos.project_infos.name}/-/labels`);
        
        cy.get("#new_label_link")
            .should("be.visible")
            .click();
        cy.get("#label_title")
            .should("be.visible")
            .click()
            .type(issue_infos.label_infos.title);
        cy.get("#label_description")
            .should("be.visible")
            .click()
            .type(issue_infos.label_infos.description);
        cy.get(".form-actions > .btn-success")
            .should("be.visible")
            .click();
    }

    gui_create_label();
});

Cypress.Commands.add("gui_set_label", issue_infos => {
    const gui_set_label = () => {
        cy.visit(`${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${issue_infos.project_infos.name}/issues/1`);
        
        cy.get(".labels > .title > .js-sidebar-dropdown-toggle")
            .should("be.visible")
            .click();
        cy.get(".label-item")
            .should("be.visible")
            .click();
        cy.get(".labels > .title > .js-sidebar-dropdown-toggle")
            .should("be.visible")
            .click();
    }

    gui_set_label();
});

Cypress.Commands.add("gui_create_milestone", issue_infos => {
    const gui_create_milestone = () => {
        cy.visit(`${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${issue_infos.project_infos.name}/-/milestones`);
        
        cy.get(".qa-new-project-milestone")
            .should("be.visible")
            .click();
        cy.get("#milestone_title")
            .should("be.visible")
            .click()
            .type(issue_infos.milestone_infos.title);
        cy.get(".qa-milestone-create-button")
            .should("be.visible")
            .click();
    }

    gui_create_milestone();
});