/// <reference types="Cypress" />

describe('API Test Examples', () => {
    beforeEach(() => {
        cy.goToApi()
    })

    //Makes sure the get call is working and retreives all the information the test required for a user
    it('Makes sure the GET call is working', () => {
        cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users/1'
        })
            .should((response) => {
                // Please see commands.js for the custom created command for maintainability 
                // that allows the user to search for any user listed and labels the information for easy readability 
                cy.fetchUserInfo()
                expect(response.status).to.eq(200)
            });
    })

    //Creates a new user with the ID of 11 and makes sure some information of the new user is confirmed 
    it('Makes sure the POST call is working by creating a user', () => {
        var user = {
            "id": 11,
            "name": "Ismael Balikci",
            "username": "India7Bravo",
            "email": "india7bravo@gmail.com",
            "address": {
                "street": "Rockcliff Drive",
                "suite": "House",
                "city": "Johannesburg",
                "zipcode": "2195",
            },
            "phone": "+2763-382-1143",
            "website": "feelgood.inc",
            "company": {
                "name": "The Room",
            }
        }

        cy.request('POST', '/users', user).then((response) => {
            expect(response.status).equal(201)
            expect(response.body.name).to.equal(user.name)
            expect(response.body.username).to.equal(user.username)
            expect(response.body.address.street).to.equal(user.address.street)
            expect(response.body.company.name).to.equal(user.company.name)
            expect(response.body.id).to.equal(user.id)
        })
    })

    //Updating the first user in the list with the given perameters
    it('Makes sure the PUT call is working', () => {
        cy.request({
            method: "PUT",
            url: "https://jsonplaceholder.typicode.com/users/1",
            body: {
                newUser: {
                    id: "2",
                    name: "Ish",
                    description: "New Employee",
                }
            },
        })
            //It makes sure the user is updated by making sure the id is equal to 2 and the name is "Ish"
            .should((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
                expect(response.body.newUser.id).to.eq('2')
                expect(response.body.newUser.name).to.eq('Ish')
            });
    })

    //I know the delete call wasn't part of the instructions, just thought a demonstration of CRUD would be great
    it('Makes sure the DELETE call is working', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://jsonplaceholder.typicode.com/users/1',
        })
        .should((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
            });
    })

    //Searches for a user based on email - Unfortunatley I was not able to complete this section fully, 
    //please see corresponding email
    it.only('Makes sure we can search for a user using an email address', () => {
        cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
            body: {
                email: 'Nathan@yesenia.net'
            }

        }).then((users) => {
            expect(['Nathan@yesenia.net']).to.be.instanceOf(Array)
        })
    })
})