import { faker } from '@faker-js/faker';

describe("Create a project via API", () => {
    beforeEach(() => cy.api_delete_projects());

    it("successfully creating a project", () => {
        const project_infos = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            initialize_with_readme: faker.datatype.boolean()
        };

        cy.api_create_blank_project(project_infos)
            .then((response) => {
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal(project_infos.name)
                expect(response.body.description).to.equal(project_infos.description)
        });
    });
  });