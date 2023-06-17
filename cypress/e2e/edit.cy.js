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

    it('edit a topic name exiting by clicking the confirm button', () => {
        // Add a new topic.
        cy.get('[data-test=add-new-topic]')
          .click()
          .focused()
          .clear()
          .type('Test')

        // Click the (now) confirm button.
        cy.get('[data-test=topic-1]')
          .parent()
          .find('.edit-topic-button')
          .find('img')
          .click()
          
        cy.get('[data-test=topic-1]')
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
          .find('.delete-topic-button')
          .find('img')
          .click()

        cy.on('window:confirm', () => true)
          
        // Check that the topic has been deleted.
        cy.get('[data-test=topic-1]')
          .should('not.exist')
    })

    it('clicking on a topic gives the option to add questions', () => {
        // Add a new topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()

        // Open the topic.
        cy.get('[data-test=topic-1]')
          .click()

        // Check that there is a button to add questions.
        cy.get('[data-test=add-new-question]')
          .should('exist')
    })

    it('add a new question with modify buttons', () => {
         // Add a new topic.
         cy.get('[data-test=topicnav]')
         .find('[data-test=add-new-topic]')
         .click()

       // Open the topic.
       cy.get('[data-test=topic-1]')
         .click()

        // Add a new question.
        cy.get('[data-test=add-new-question]')
          .click()

        // Check that the new question got added.
        cy.get('[data-test=question-1]')
          .should('exist')

        // Check that a corresponding answer got added.
        cy.get('[data-test=answer-1]')
          .should('exist')

        // Check that the modify buttons got added.
        cy.get('[data-test=question-1]')
          .parent()
          .find('img')
          .should('have.length','2');
    })

    it('add multiple questions', () => {
        // Add a new topic.
        cy.get('[data-test=topicnav]')
        .find('[data-test=add-new-topic]')
        .click()

        // Open the topic.
        cy.get('[data-test=topic-1]')
          .click()

        // Add a new question.
        cy.get('[data-test=add-new-question]')
          .click()
 
        // Check that the new question got added.
        cy.get('[data-test=question-1]')
          .should('exist')
 
        // Check that a corresponding answer got added.
        cy.get('[data-test=answer-1]')
         .should('exist')

        // Add a second question.
        cy.get('[data-test=add-new-question]')
          .click()

        // Check that the second question got added.
        cy.get('[data-test=question-2]')
          .should('exist')

        // Check that a corresponding answer got added.
        cy.get('[data-test=answer-2]')
          .should('exist')

        // Add a third question.
        cy.get('[data-test=add-new-question]')
          .click()

        // Check that the second question got added.
        cy.get('[data-test=question-3]')
          .should('exist')

        // Check that a corresponding answer got added.
        cy.get('[data-test=answer-3]')
          .should('exist')
    })

    it('edit a question and its answer', () => {
        const questionText = 'What is the answer to the test question?'
        const answerText= 'Success!'

        // Add a new topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()

        // Open the topic.
        cy.get('[data-test=topic-1]')
          .click()

        // Add a new question.
        cy.get('[data-test=add-new-question]')
          .click()
          .focused()
          .clear()
          .type(questionText)

        cy.get('[data-test=answer-1]')
          .clear()
          .type(answerText)
          .type('{enter}')

        // Check that the question was successfully updated.
        cy.get('[data-test=question-1]')
          .should('have.text',questionText)
        
        // Check that the answer was successfully updated.
        cy.get('[data-test=answer-1]')
          .should('have.text',answerText)
    }) 

    it('delete a question', () => {
        // Add a new topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()

        // Open the topic.
        cy.get('[data-test=topic-1]')
          .click()

        // Add a new question.
        cy.get('[data-test=add-new-question]')
          .click()

        // Click the question delete button.
        cy.get('[data-test=question-1]')
          .parent()
          .find('.delete-question-button')
          .click()
          
        cy.on('window:confirm', () => true)

        // Check that the question and answer was deleted.
        cy.get('[data-test=question-1]')
          .should('not.exist')

        cy.get('[data-test=answer-1]')
          .should('not.exist')
    })

    it('JSON stored after adding a question', () => {
        // Add a new topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()

        // Open the topic.
        cy.get('[data-test=topic-1]')
          .click()

        // Add a new question.
        cy.get('[data-test=add-new-question]')
          .click()

        // Check that there is a parsable JSON object stored in the topic attributes.
        cy.get('[data-test=topic-1]')
          .invoke('attr','data-questions')
          .should('eq','{"questions":["Question 1?"],"answers":["Answer 1."]}')
    })

    it('JSON stored after editing a question', () => {
        const questionText = 'TestQ?'
        const answerText = 'TextA!'

        // Add a new topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()

        // Open the topic.
        cy.get('[data-test=topic-1]')
          .click()

        // Add a new question.
        cy.get('[data-test=add-new-question]')
          .click()
          .focused() // Edit the question.
          .clear()
          .type(questionText)

        cy.get('[data-test=answer-1]')
          .clear()
          .type(answerText)
        
        // Click the question edit (now check) button.
        cy.get('[data-test=question-1]')
          .parent()
          .find('.edit-question-button')
          .click()
        
        // Check that the JSON has saved correctly.
        cy.get('[data-test=topic-1]')
          .invoke('attr','data-questions')
          .should('eq',`{"questions":["${questionText}"],"answers":["${answerText}"]}`)
    })

    it('Correct JSON stored after editting multiple questions', () => {
        // Add a new topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()

        // Open the topic.
        cy.get('[data-test=topic-1]')
          .click()

        // Add the first question.
        cy.get('[data-test=add-new-question]')
          .click()
          .focused()
          .clear()
          .type('Q1')

        cy.get('[data-test=answer-1]')
          .clear()
          .type('A1')
          .type('{enter}')

        // Add the second question
        cy.get('[data-test=add-new-question]')
          .click()
          .focused()
          .clear()
          .type('Q2')

        cy.get('[data-test=answer-2]')
          .clear()
          .type('A2')
          .type('{enter}')

        // Add the third question
        cy.get('[data-test=add-new-question]')
          .click()
          .focused()
          .clear()
          .type('Q3')

        cy.get('[data-test=answer-3]')
          .clear()
          .type('A3')
          .type('{enter}')
        
        // Add the fourth question
        cy.get('[data-test=add-new-question]')
          .click()
          .focused()
          .clear()
          .type('Q4')

        cy.get('[data-test=answer-4]')
          .clear()
          .type('A4')
          .type('{enter}')

        // Check that the JSON has saved correctly.
        cy.get('[data-test=topic-1]')
          .invoke('attr','data-questions')
          .should('eq','{"questions":["Q1","Q2","Q3","Q4"],"answers":["A1","A2","A3","A4"]}')
    })

    it('correct JSON stored after deleting question', () => {
        // Add a new topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()

        // Open the topic.
        cy.get('[data-test=topic-1]')
          .click()

        /// Add the first question.
        cy.get('[data-test=add-new-question]')
        .click()
        .focused()
        .clear()
        .type('Q1')

        cy.get('[data-test=answer-1]')
          .clear()
          .type('A1')
          .type('{enter}')

        // Add the second question
        cy.get('[data-test=add-new-question]')
          .click()
          .focused()
          .clear()
          .type('Q2')

        cy.get('[data-test=answer-2]')
          .clear()
          .type('A2')
          .type('{enter}')

        // Delete the first question
        cy.get('[data-test=question-1]')
          .parent()
          .find('.delete-question-button')
          .click()

        // Check that the JSON has saved correctly.
        cy.get('[data-test=topic-1]')
          .invoke('attr','data-questions')
          .should('eq','{"questions":["Q2"],"answers":["A2"]}')
    })

    it('saves JSON to session storage when switching pages', () => {
        // Add the first topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()
          .focused()
          .type('sessionTopic1')
          .type('{enter}')

        // Open the topic.
        cy.get('[data-test=topic-1]')
          .click()

        /// Add the first question.
        cy.get('[data-test=add-new-question]')
          .click()
          .focused()
          .clear()
          .type('Q1')

        cy.get('[data-test=answer-1]')
          .clear()
          .type('A1')
          .type('{enter}')

        // Add the second question
        cy.get('[data-test=add-new-question]')
          .click()
          .focused()
          .clear()
          .type('Q2')

        cy.get('[data-test=answer-2]')
          .clear()
          .type('A2')
          .type('{enter}')

        // Add the second topic.
        cy.get('[data-test=topicnav]')
          .find('[data-test=add-new-topic]')
          .click()
          .focused()
          .type('sessionTopic2')
          .type('{enter}')

        // Open the topic.
        cy.get('[data-test=topic-2]')
          .click()

        /// Add the first question.
        cy.get('[data-test=add-new-question]')
          .click()
          .focused()
          .clear()
          .type('Q3')

        cy.get('[data-test=answer-1]')
          .clear()
          .type('A3')
          .type('{enter}')

        // Click the logo to go back to the index.
        cy.get('[data-test=load]')
          .click()

        // Check that the first topic's data was stored in the sessionState
        cy.window()
          .its('sessionStorage')
          .invoke('getItem','sessionTopic1')
          .should('contain','{"questions":["Q1","Q2"],"answers":["A1","A2"]}')
        
        // Check that the second topic's data was stored in the sessionState
        cy.window()
          .its('sessionStorage')
          .invoke('getItem','sessionTopic2')
          .should('contain','{"questions":["Q3"],"answers":["A3"]}')
    })

    it('topics from session state are loaded', () => {
      // Set the session state.
      cy.window()
        .setSessionTopics()

      cy.visit('/edit.html')

      cy.get('[data-test=topicnav]')
        .find('.topicdiv')
        .should('have.length',2)
    })

    it('topics from session state display correct questions', () => {
      // Set the session state.
      cy.window()
        .setSessionTopics()

      cy.visit('/edit.html')

      cy.get('[data-test=topic-1]')
        .click()

      cy.get('[data-test=question-1]')
        .should('have.text','Q1')

      cy.get('[data-test=answer-1]')
        .should('have.text','A1')

      cy.get('[data-test=question-2]')
        .should('have.text','Q2')

      cy.get('[data-test=answer-2]')
        .should('have.text','A2')

      cy.get('[data-test=topic-2]')
        .click()

      cy.get('[data-test=question-1]')
        .should('have.text','Q3')

      cy.get('[data-test=answer-1]')
        .should('have.text','A3')
    })
})