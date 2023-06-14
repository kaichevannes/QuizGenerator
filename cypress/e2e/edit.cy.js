describe('Test edit.html', () => {
    beforeEach(() => {
        cy.visit('/edit.html')
    })

    it('edit contains sidenav', () => {
        cy.get('[data-test=sidenav]')
          .should('exist')
    })

    it('edit contains topicnav', () => {
        cy.get('[data-test=topicnav]')
          .should('exist')
    })

    // This is only checking the case where nothing is loaded?
    it('topicnav contains expected elements', () => {
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .contains('+')
    })

    it('edit contains instruction text', () => {
        cy.get('[data-test=instruction-text]')
          .should('exist')
    })
})