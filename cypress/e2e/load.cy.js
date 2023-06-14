describe('Test load.html', () => {
    beforeEach(() => {
        cy.visit('/load.html')
    })

    it('load contains sidenav', () => {
        cy.get('[data-test=sidenav]')
          .should('exist')
    })
})