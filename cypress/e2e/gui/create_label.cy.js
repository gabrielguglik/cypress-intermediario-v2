import { faker } from '@faker-js/faker';

describe("Create a label for an issue", () => {
    const issue_infos = {
        title: `issue-${faker.datatype.uuid()}`, 
        description: faker.random.words(10),
        project_infos: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        },
        label_infos: {
            title: `label-${faker.datatype.uuid()}`, 
            description: faker.random.words(5)
        }
    };

    beforeEach(() => {
        cy.visit("/");
        cy.api_delete_projects();
        cy.login();
        cy.api_create_issue(issue_infos);
    });

    it("successfully creating a label", () => {
        cy.gui_create_label(issue_infos);

        cy.get(".label-name").should("contain", issue_infos.label_infos.title);
        cy.get(".description-text").should("contain", issue_infos.label_infos.description);
    });
});