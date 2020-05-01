/// <reference types="cypress" />

context('Event Page', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.visit('http://127.0.0.1:4200/events')
    // cy.visit('http://45.76.237.107:4200/events')
  })

  it('should display calendar', () => {
    cy.get('#full-calendar').should('exist')
  })
})
