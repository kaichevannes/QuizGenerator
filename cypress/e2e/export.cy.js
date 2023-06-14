describe('Test export.html', () => {
    beforeEach(() => {
        cy.visit('/export.html')
    })

    it('export contains sidenav', () => {
        cy.get('[data-test=sidenav]')
          .should('exist')
    })
})