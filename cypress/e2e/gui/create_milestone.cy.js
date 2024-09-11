import { faker } from '@faker-js/faker';

describe("Create a milestone for an issue", () => {
    const issue_infos = {
        title: `issue-${faker.datatype.uuid()}`, 
        description: faker.random.words(10),
        project_infos: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        },
        milestone_infos: {
            title: `milestone-${faker.datatype.uuid()}`, 
        }
    };

    beforeEach(() => {
        cy.visit("/");
        cy.api_delete_projects();
        cy.login();
        cy.api_create_issue(issue_infos);
    });

    it("successfully creating a milestone", () => {
        cy.gui_create_milestone(issue_infos);

        cy.get(".detail-page-description").should("be.visible").and("contain", issue_infos.milestone_infos.title);
    });
});