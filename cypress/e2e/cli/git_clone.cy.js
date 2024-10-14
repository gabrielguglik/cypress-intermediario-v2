// not including git clone test because of ssh key problems

import { faker } from '@faker-js/faker';

describe('Clone a project via git clone', () => {
    const project_infos = {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    };

    beforeEach(() => {
        cy.api_delete_projects();
        cy.api_create_blank_project(project_infos);
    });

    it('Successfully cloning a project via git clone', () => {
        cy.clone_via_SSH(project_infos);

        cy.readFile(`cypress/downloads/${project_infos.name}/README.md`)
            .should('contain', `# ${project_infos.name}`)
            .and('contain', project_infos.description);
    });
});