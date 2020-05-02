/// <reference types="cypress" />

context('FAQ Page', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:4200/faq')
    })

    it('should display google map', () => {
      cy.get('.map-row').should('exist')
    })

    it('should display accordion', () => {
        cy.get('.ui.styled.accordion.custom').should('exist')
    })

    it('should have 7 Q & A', () => {
        cy.get('.ui.styled.accordion.custom').find('[class="active title"]').should('have.length', 1)
        cy.get('.ui.styled.accordion.custom').find('[class="title"]').should('have.length', 6)
    })

    it('should display email modal', () => {
        cy.get('#email-accordion').click()
        cy.get('#email-button').click()
        cy.get('#emailModal').should('be.visible')
    })
  })
