describe('Test test.html', () => {
    beforeEach(() => {
        cy.visit('/test.html')
    })

    it('test contains sidenav', () => {
        cy.get('[data-test=sidenav]')
          .should('exist')
    })
})