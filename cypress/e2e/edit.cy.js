describe('Test edit.html', () => {
    beforeEach(() => {
        cy.visit('/edit.html')
    })

    it('edit contains sidenav', () => {
        cy.get('[data-test=sidenav]')
          .should('exist')
    })
})