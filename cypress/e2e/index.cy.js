describe('Test index.html', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('contains sidenav', () => {
        cy.get('[data-test=sidenav]')
          .should('exist')
    })

    it('sidenav contains expected elements', () => {
        cy.get('[data-test=logo-anchor]')
          .contains('ChatGPT Quiz')
          .find('img')
          .should('have.attr', 'src')

        cy.get('[data-test=load]')
          .contains('Load')

        cy.get('[data-test=edit]')
          .contains('Edit')

        cy.get('[data-test=test]')
          .contains('Test')

        cy.get('[data-test=export]')
          .contains('Export')
    })

    it('check sidenav logo navigates to correct page', () => {
        cy.get('[data-test=sidenav]')
          .find('[data-test=logo-anchor]')
          .click()
          .location('pathname')
          .should('eq','/index.html')
    })

    it('check sidenav load navigates to correct page', () => {
        cy.get('[data-test=sidenav]')
          .find('[data-test=load]')
          .click()
          .location('pathname')
          .should('eq','/load.html')
    })

    it('check sidenav edit navigates to correct page', () => {
        cy.get('[data-test=sidenav]')
          .find('[data-test=edit]')
          .click()
          .location('pathname')
          .should('eq','/edit.html')
    })

    it('check sidenav test navigates to correct page', () => {
        cy.get('[data-test=sidenav]')
          .find('[data-test=test]')
          .click()
          .location('pathname')
          .should('eq','/test.html')
    })

    it('check sidenav export navigates to correct page', () => {
        cy.get('[data-test=sidenav]')
          .find('[data-test=export]')
          .click()
          .location('pathname')
          .should('eq','/export.html')
    })

    it('check there is introduction text', () => {
        cy.get('[data-test=introduction-text]')
          .should('exist')
    })
})