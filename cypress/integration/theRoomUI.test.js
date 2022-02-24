/// <reference types="Cypress" />

describe('UI tests for Todo', () => {
    it('Create new todo item, toggle complete', () => {
        cy.goTo()
        //Creates multiple todo items
        cy.get('.new-todo').click().type('This is an example of updating').type('{enter}')
        cy.get('.new-todo').click().type('This is a test of the creation of a todo').type('{enter}')
        cy.get('.new-todo').click().type('(Hopefully) Impress the reviewers').type('{enter}')
        cy.get('.new-todo').click().type('Sign offer for The Room').type('{enter}')

        //Updates one of the list items
        cy.get('li').eq(7).dblclick().clear().type('Updated' + '{enter}')

        //Makes sure the text is what we expected it to be as well as making sure it isn't marked as completed
        cy.get('li').eq(8).should('have.text', 'This is a test of the creation of a todo')
        cy.get('.toggle').should('not.be.checked')

        //Clicking the toggle button to mark as complete and making sure the right visuals are displayed for the completed task
        cy.get('.toggle').eq(0).click()
        cy.get('.toggle').eq(1).click()
        cy.get('.toggle').eq(2).click()
        cy.get('.view > label').should('have.css', 'text-decoration-line', 'line-through')
    })

    it('It goes to completed and clears completed items', () => {
        //Visits the "Com[pleted tasks" screen
        cy.contains('Completed').click()

        //Clearing the completed tasks
        cy.contains('Clear completed').click()
    })

    it('It goes to active and hopes for the best', () => {
        //Visits the "Active" screen
        cy.contains('Active').click()
    })
});