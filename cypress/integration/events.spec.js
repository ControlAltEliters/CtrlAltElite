/// <reference types="cypress" />

context('Events Page', () => {

  beforeEach(() => {
    // Clear app session - fresh state
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })

    // Setup /users/user stub
    cy.server()
    cy.route('GET', '*users/user*', 'fixture:user.json').as("userResponse");

    // Setup /events/events stub
    cy.route('GET', '*events/events*', 'fixture:events.json').as("eventResponse");

    // Trigger user and events stubs
    cy.visit('http://127.0.0.1:4200/events')
    cy.wait("@userResponse");
    cy.wait("@eventResponse");

    // Visit page under test
    cy.visit('http://127.0.0.1:4200/events')
  })

  it('should display calendar', () => {
    cy.get('#full-calendar').should('exist')
  })

  it('should display google map', () => {

    // Assertions
    cy.get('.map-row').should('be.visible')
  })

  it('should display schedule event button', () => {

    // Assertions
    cy.get('#schedule-event-button').should('exist')
  })

  // should display event modal when an event is clicked
  it('should display event modal when an event is clicked', () => {

    // Assertions
    cy.get('.fc-day-grid-event').first().click()
    cy.get('#singleEventModal').should('be.visible')
  })

  // ON EVENT MODAL:

  // should display join event, leave event

  // should display messages - and redirect you go discussion board when clicked
})
