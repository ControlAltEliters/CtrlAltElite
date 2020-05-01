/// <reference types="cypress" />

context('Admin Dashboard', () => {

  beforeEach(() => {
    // Clear app session - fresh state
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })

    // Setup /users/user stub
    cy.server()
    cy.route('GET', '*users/user*', 'fixture:admin.json').as("userResponse");

    // Setup /events/events stub
    cy.route('GET', '*events/events*', 'fixture:events.json').as("eventResponse");

    // Setup /users/listofusers stub
    cy.route('GET', '*users/listofusers*', 'fixture:listofusers.json').as("usersResponse");


    // Trigger user stub
    cy.visit('http://127.0.0.1:4200/adminDashboard')
    cy.wait("@userResponse");
    cy.wait("@eventResponse");
    cy.wait("@usersResponse");


    // Visit page under test
    cy.visit('http://127.0.0.1:4200/adminDashboard')
  })

  it('should display options for users and events', () => {

    // Assertions
    cy.get('#options-menu').should('exist')
    cy.get('#options-menu').find('a').should('have.length', 2)
  })

})
