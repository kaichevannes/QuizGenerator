describe('Test test.html', () => {
    beforeEach(() => {
        cy.visit('/test.html')
    })

    it('contains sidenav', () => {
        cy.get('[data-test=sidenav]')
          .should('exist')
    })

    it('contains topicnav', () => {
        cy.get('[data-test=topicnav]')
          .should('exist')
    })

    it('loads topics from session data', () => {
        cy.window()
          .setSessionTopics()

        cy.visit('/test.html')

        cy.get('[data-test=topic-1]')
          .should('have.text','T1')

        cy.get('[data-test=topic-2]')
          .should('have.text','T2')
    })
})