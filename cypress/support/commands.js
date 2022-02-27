// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//This is a custom command created to "go to" the todo website
Cypress.Commands.add('goTo', (label) => {
    cy.visit('https://todomvc.com/examples/react/#/')    
});

//This is a custom command created to go to the API website
Cypress.Commands.add('goToApi', (label) => {
    cy.visit('https://jsonplaceholder.typicode.com/')
});

//This is the custom command created for fetching users information -
//Please feel free to adjust the number '1' in the URL to get information on a diffferent user
Cypress.Commands.add('fetchUserInfo', (label) => {
    cy.request({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users/1'
    })
        .should((response) => {
            cy.log(JSON.stringify(response.body['name'])).as('Name')
            cy.log(JSON.stringify(response.body['email'])).as('Email')
            cy.log(JSON.stringify(response.body['phone'])).as('Phone')
            cy.log(JSON.stringify(response.body['address'])).as('Address')
            cy.log(JSON.stringify(response.body['website'])).as('Website')
        });
})