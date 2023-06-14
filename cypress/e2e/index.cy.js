describe('Test index.html', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('sidebar contains expected elements', () => {
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

    it('check sidebar logo navigates to correct page', () => {
        cy.get('[data-test=logo-anchor]')
          .click()
          .location('pathname')
          .should('eq','/index.html')
    })

    it('check sidebar load navigates to correct page', () => {
        cy.get('[data-test=load]')
          .click()
          .location('pathname')
          .should('eq','/load.html')
    })

    it('check sidebar edit navigates to correct page', () => {
        cy.get('[data-test=edit]')
          .click()
          .location('pathname')
          .should('eq','/edit.html')
    })

    it('check sidebar test navigates to correct page', () => {
        cy.get('[data-test=test]')
          .click()
          .location('pathname')
          .should('eq','/test.html')
    })

    it('check sidebar export navigates to correct page', () => {
        cy.get('[data-test=export]')
          .click()
          .location('pathname')
          .should('eq','/export.html')
    })
})