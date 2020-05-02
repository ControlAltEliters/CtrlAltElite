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
    cy.get('#join-event-button-logged-in').should('be.visible')
    cy.get('#leave-event-button').should('be.visible')
  })

  // ON EVENT MODAL:

  // should display messages - and redirect you go discussion board when clicked
  it('should display messages button and redirect when clicked', () => {

    // Assertions
    cy.get('.fc-day-grid-event').first().click()
    cy.get('#singleEventModal').should('be.visible')
    cy.get('#messages-button').click()
    cy.url().should('include', '/messages')
  })

  it('should allow user to create an event', () => {

    cy.route('POST', '*events/createEvent*', 'fixture:createEvent.json').as("createEventRequest");

    cy.get('#schedule-event-button').click()
    cy.get('input[formControlName=eventTitle]').type('TEST GAME')
    cy.get('select[formControlName=minPlayers]').select('2')
    cy.get('select[formControlName=maxPlayers]').select('5')
    cy.get('input[formControlName=date]').type('2020-05-02')
    cy.get('select[formControlName=startTime]').select('2')
    cy.get('input[id=create-checked1]').check()
    cy.get('select[formControlName=endTime]').select('8')
    cy.get('input[id=create-checked2]').check()
    cy.get('input[formControlName=resources]').type('TEST')
    cy.get('#choose-table-button').click()
    cy.get('#table-1-available').click()
    cy.get('#create-event-button').click()

    cy.wait('@createEventRequest')
    .then(request => {
      expect(request.requestBody.date).to.eq('2020-05-02');
      expect(request.requestBody.endTime).to.eq(20);
      expect(request.requestBody.startTime).to.eq(14);
      expect(request.requestBody.maxPlayers).to.eq(5);
      expect(request.requestBody.minPlayers).to.eq(2);
      expect(request.requestBody.eventCreator).to.eq('John');
      expect(request.requestBody.eventTitle).to.eq('TEST GAME');
      expect(request.requestBody.table).to.eq('1');
    });

  })
})
