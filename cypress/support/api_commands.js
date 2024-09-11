const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add("api_create_blank_project", project_infos => {
    const api_create_blank_project = () => {
        cy.request({
            method: 'POST',
            url: '/api/v4/projects/',
            body: {
                name: project_infos.name,
                description: project_infos.description,
                initialize_with_readme: project_infos.initialize_with_readme
            },
            headers: { Authorization: accessToken }
        });
    };

    api_create_blank_project();
});

Cypress.Commands.add("api_get_all_projects", () => {
    const api_get_all_projects = () => {
        cy.request({
            method: 'GET',
            url: '/api/v4/projects',
            headers: { Authorization: accessToken } 
        });
    };

    api_get_all_projects();
});

Cypress.Commands.add("api_delete_projects", () => {
    cy.api_get_all_projects().then(res =>
        res.body.forEach(project => cy.request({
            method: 'DELETE',
            url: `/api/v4/projects/${project.id}`,
            headers: { Authorization: accessToken } 
        }))
    );
});

Cypress.Commands.add("api_create_issue", issue_infos => {
    cy.api_create_blank_project(issue_infos.project_infos).then(res =>
        cy.request({
            method: 'POST',
            url: `/api/v4/projects/${res.body.id}/issues`,
            body: {
                title: issue_infos.title,
                description: issue_infos.description,
            },
            headers: { Authorization: accessToken }
        })
    );
});

Cypress.Commands.add("api_create_label", (issue_infos, project_id) => {
        cy.request({
            method: 'POST',
            url: `/api/v4/projects/${project_id}/labels`,
            body: {
                name: issue_infos.label_infos.title,
                color: issue_infos.label_infos.color,
            },
            headers: { Authorization: accessToken }
        });
});