import { faker } from '@faker-js/faker';

describe("Create an issue for a project", () => {
    const issue_infos = {
        title: `issue-${faker.datatype.uuid()}`, 
        description: faker.random.words(10),
        project_infos: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    };

    beforeEach(() => {
        cy.visit("/");
        cy.api_delete_projects();
        cy.login();
        cy.api_create_blank_project(issue_infos.project_infos);
    });

    it("successfully creating an issue", () => {
        cy.gui_create_issue(issue_infos);

        cy.get(".detail-page-description")
            .should("contain", issue_infos.title)
            .and("contain", issue_infos.description);
    });
});