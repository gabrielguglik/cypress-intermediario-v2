import { faker } from '@faker-js/faker';

describe("Set a label for an issue", () => {
    const issue_infos = {
        title: `issue-${faker.datatype.uuid()}`, 
        description: faker.random.words(10),
        project_infos: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        },
        label_infos: {
            title: `label-${faker.datatype.uuid()}`, 
            description: faker.random.words(5),
            color: "#428BCA"
        }
    };

    beforeEach(() => {
        cy.visit("/");
        cy.api_delete_projects();
        cy.login();
        cy.api_create_issue(issue_infos).then(res =>
            cy.api_create_label(issue_infos, res.body.id)
        );
    });

    it("successfully setting a label for an issue", () => {
        cy.gui_set_label(issue_infos);

        cy.get(".qa-labels-block").should("contain", issue_infos.label_infos.title)
        cy.get(".qa-labels-block span").should("have.attr", "style", `background-color: ${issue_infos.label_infos.color}; color: #FFFFFF;`)
    });
});