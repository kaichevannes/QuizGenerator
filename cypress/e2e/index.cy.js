describe('Test index.html', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    
    it('sidebar contains expected elements', () => {
        cy.get('[data-test=logo]')
          .find('img');

        cy.get('[data-test=load]')
          .contains('Load');

        cy.get('[data-test=edit]')
          .contains('Edit');

        cy.get('[data-test=test')
          .contains('Test');

        cy.get('[data-test=export')
          .contains('Export');
    })
})