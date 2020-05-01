/// <reference types="cypress" />

context('FAQ Page', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:4200/faq')
    })

    it('should display google map', () => {
      cy.get('.map-row').should('exist')
    })

    it('should successfully authenticate user', () => {
      cy.visit('http://127.0.0.1:4200/login')
      cy.get('input[name=email]').type('testuser@yoohoo.com')
      cy.get('input[name=password]').type('command')
      cy.get('#login').click();

      cy.wait(500)

      cy.visit('http://127.0.0.1:4200/faq')

      cy.url().should('include', '/faq')
      cy.get('.avatar').should('exist')

      cy.get('.ui.styled.accordion.custom').should('exist')

      cy.get('#nav-logout').click();
    })

    it('should display accordian', () => {
        cy.get('.ui.styled.accordion.custom').should('exist')
    })

    it('should have 7 Q & A', () => {
        // cy.get('[class=".ui.styled.accordion.custom"] > [class="title"]').its('length').then((size) => {
        //     cy.get('[class=".ui.styled.accordion.custom"] > div:nth-child(' + size + ')').find('title').should('dropdown.icon', 'title', 'content')
        //  });
        cy.get('.ui.styled.accordion.custom').find('[class="active title"]').should('have.length', 1)
        cy.get('.ui.styled.accordion.custom').find('[class="title"]').should('have.length', 6)
    })

    it('should display email modal', () => {
        cy.get('#email-accordion').click()
        cy.get('#email-button').click()
        cy.get('#emailModal').should('be.visible')
    })
  })
