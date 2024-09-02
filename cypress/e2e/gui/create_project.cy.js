import { faker } from '@faker-js/faker';

describe("Create a project", () => {
    it("successfully creating a project", () => {
        cy.visit("/");
        cy.api_delete_projects();
        cy.login();
        const project_infos = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.gui_create_blank_project(project_infos);
        
        cy.url().should("be.equal", `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project_infos.name}`);
    });
  });
  