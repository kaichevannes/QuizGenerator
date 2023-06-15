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

    // This is only checking the case where nothing is loaded.
    it('topicnav contains expected elements', () => {
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .contains('+')
    })

    it('edit contains instruction text', () => {
        cy.get('[data-test=instruction-text]')
          .should('exist')
    })

    it('check that a new topic is added when the add button is clicked', () => {
        cy.get('[data-test=topicnav]')
          .children()
          .its('length')
          .then(($length) => {

            // Add a new topic.
            cy.get('[data-test=add-new-topic]')
              .click()

            // Check that the new topic has been added with modify buttons.
            cy.get('[data-test=topicnav]')
              .children()
              .should('have.length',$length + 1)
              .and('contain','Topic 1')
              .find('img')
              .should('have.length',2)

            // Add two more topics.
            cy.get('[data-test=add-new-topic]')
              .click()
              .click()

            // Check that two new topics have been added with modify buttons.
            cy.get('[data-test=topicnav]')
              .children()
              .should('have.length',$length + 3)
              .and('contain','Topic 2')
              .and('contain','Topic 3')
              .find('img')
              .should('have.length',6)
          })
    })

    it('edit a topic name exiting with enter', () => {
        // Add a new topic.
        cy.get('[data-test=add-new-topic]')
          .click()

        // Edit the topic name.
        cy.get('[data-test=topic-1]')
          .parent()
          .find('.edit-button')
          .find('img')
          .click()
          .focused()
          .clear()
          .type('Test')
          .type('{enter}')
          .invoke('attr','contentEditable')
          .should('contain','false')

        // Check that the new topic name has been successfully changed.
        cy.get('[data-test=topic-1]')
          .should('have.text','Test')
    })  

    it('edit a topic name exiting by unfocusing', () => {
        // Add a new topic.
        cy.get('[data-test=add-new-topic]')
          .click()

        // Edit the topic name.
        cy.get('[data-test=topic-1]')
          .parent()
          .find('.edit-button')
          .find('img')
          .click()
          .focused()
          .clear()
          .type('Test')
          .blur()
          .invoke('attr','contentEditable')
          .should('contain','false')

        // Check that the new topic name has been successfully changed.
        cy.get('[data-test=topic-1]')
          .contains('Test')
    })

    it('delete a topic', () => {
        // Add a new topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()

        // Delete the topic.
        cy.get('[data-test=topic-1]')
          .parent()
          .parent()
          .find('.delete-button')
          .find('img')
          .click()

        cy.on('window:confirm', () => true)
          
        // Check that the topic has been deleted.
        cy.get('[data-test=topic-1]')
          .should('not.exist');
    })

    it('clicking on a topic shows topic questions', () => {
        
    })
})