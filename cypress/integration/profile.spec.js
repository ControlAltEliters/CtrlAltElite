/// <reference types="cypress" />

context('Profile Page', () => {

  beforeEach(() => {
    // Clear app session - fresh state
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })

    // Setup /users/user stub
    cy.server()
    cy.route('GET', '*users/user*', 'fixture:user.json').as("userResponse");

    // Trigger user stub
    cy.visit('http://127.0.0.1:4200/')
    cy.wait("@userResponse");

    // Visit page under test
    cy.visit('http://127.0.0.1:4200/account/profile')
  })


  it('should display navigation menu and correct number of nav items', () => {

    // Assertions
    cy.get('#left-nav-menu').should('exist')
    cy.get('#left-nav-menu').find('a').should('have.length', 5)
  })

  it('should display profile avatar', () => {

    // Assertions
    cy.get('#profile-pic').should('exist')
  })

  it('should display profile info fields', () => {

    // Assertions
    cy.get('#first-name').should('exist')
    cy.get('#last-name').should('exist')
    cy.get('#username').should('exist')
    cy.get('#email').should('exist')
  })

  it('should display edit info button and pop modal when clicked', () => {

    // Assertions
    cy.get('#edit-info-button').should('exist')
    cy.get('#edit-info-button').click()
    cy.get('#editProfileModal').should('exist')
  })

  it('should display update password button and pop modal when clicked', () => {

    // Assertions
    cy.get('#update-password-button').should('exist')
    cy.get('#update-password-button').click()
    cy.get('#editPasswordModal').should('exist')
  })

  it('should not display Google map in footer', () => {

    // Assertions
    cy.get('.map-row').should('not.exist')
  })

})
