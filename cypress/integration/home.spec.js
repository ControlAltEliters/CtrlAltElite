/// <reference types="cypress" />

context('Home Page', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    // Setup server
    cy.server()

    // Setup /events/events stub
    cy.route('GET', '*events/event-puller*', 'fixture:eventpuller.json').as("eventResponse");

    // Trigger user stub
    cy.visit('http://127.0.0.1:4200/')
    cy.wait("@eventResponse");


    // Visit page under test
    cy.visit('http://127.0.0.1:4200/home')
  })

  it('should display event modal', () => {
    cy.get('.sidebar-event').first().click();
    cy.get('#eventModal').should('have.class', 'visible')
  })

  it('should display google map', () => {
    cy.get('.map-row').should('be.visible')
  })

  it('should redirect to login when guest tries to join event', () => {
    cy.get('.sidebar-event').first().click();
    cy.get('#eventModal .actions div .button').click()

    cy.url().should('include', '/login')
  })

  it('should successfully authenticate user', () => {
    cy.visit('http://127.0.0.1:4200/login')
    cy.get('input[name=email]').type('testuser@yoohoo.com')
    cy.get('input[name=password]').type('command')
    cy.get('#login').click();

    cy.url().should('include', '/home')
    cy.get('.avatar').should('be.visible')

    cy.get('#nav-logout').click();
  })


})
