import { faker } from '@faker-js/faker';

describe("Create an issue via API", () => {
    beforeEach(() => cy.api_delete_projects());

    it("successfully creating an issue", () => {
        const issue_infos = {
            title: `issue-${faker.datatype.uuid()}`, 
            description: faker.random.words(10),
            project_infos: {
                name: `project-${faker.datatype.uuid()}`,
                description: faker.random.words(5)
            }
        };

        cy.api_create_issue(issue_infos)
            .then((response) => {
                expect(response.status).to.equal(201)
                expect(response.body.title).to.equal(issue_infos.title)
                expect(response.body.description).to.equal(issue_infos.description)
        });
    });
  });