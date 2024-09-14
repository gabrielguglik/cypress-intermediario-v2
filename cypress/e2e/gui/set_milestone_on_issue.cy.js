import { faker } from '@faker-js/faker';

describe("Set a milestone for an issue", () => {
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
        cy.api_create_issue(issue_infos).then(res =>
            cy.api_create_milestone(issue_infos, res.body.id)
        );
    });

    it("successfully setting a milestone for an issue", () => {
        cy.gui_set_milestone(issue_infos);

        cy.get(".milestone").should("contain", issue_infos.milestone_infos.title);
    });
});