describe('Test test.html', () => {
    beforeEach(() => {
        cy.window()
          .setSessionTopics()

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
        cy.get('[data-test=topic-1]')
          .should('have.text','T1')

        cy.get('[data-test=topic-2]')
          .should('have.text','T2')
    })

    it('clicking topic shows expected elements', () => {
        cy.get('[data-test=topic-1]')
          .click()

        cy.get('[data-test=progress-bar]')
          .should('exist')

        cy.get('[data-test=test-question]')
          .should('exist')

        cy.get('[data-test=answer-fieldset]')
          .should('exist')

        cy.get('[data-test=goto-first]')
          .should('exist')

        cy.get('[data-test=goto-prev]')
          .should('exist')

        cy.get('[data-test=goto-next]')
          .should('exist')

        cy.get('[data-test=goto-last]')
          .should('exist')
    })

    it('clicking topic shows first question', () => {
        cy.get('[data-test=topic-1]')
          .click()

        cy.get('[data-test=test-question]')
          .should('have.text','Q1')

        cy.get('[data-test=answer-fieldset]')
          .contains('A1')
    }) 

    it('navigating questions shows the new question and answer with correct progess bar value', () => {
        cy.get('[data-test=topic-1]')
          .click()

        cy.get('[data-test=test-question]')
          .should('have.text','Q1')

        cy.get('[data-test=answer-fieldset]')
          .contains('A1')

        cy.get('[data-test=progress-bar]')
          .invoke('attr','value')
          .should('eq','1')
        
        cy.get('[data-test=goto-next]')
          .click()
          
        cy.get('[data-test=test-question]')
          .should('have.text','Q2')

        cy.get('[data-test=answer-fieldset]')
          .contains('A2')

          cy.get('[data-test=progress-bar]')
          .invoke('attr','value')
          .should('eq','2')

        cy.get('[data-test=goto-next]')
          .click()

        cy.get('[data-test=test-question]')
          .should('have.text','Q3')

        cy.get('[data-test=answer-fieldset]')
          .contains('A3')

        cy.get('[data-test=progress-bar]')
          .invoke('attr','value')
          .should('eq','3')

        cy.get('[data-test=goto-first]')
          .click()

        cy.get('[data-test=test-question]')
          .should('have.text','Q1')

        cy.get('[data-test=answer-fieldset]')
          .contains('A1')

        cy.get('[data-test=progress-bar]')
          .invoke('attr','value')
          .should('eq','1')

        cy.get('[data-test=goto-last]')
          .click()

        cy.get('[data-test=test-question]')
          .should('have.text','Q3')

        cy.get('[data-test=answer-fieldset]')
          .contains('A3')

        cy.get('[data-test=progress-bar]')
          .invoke('attr','value')
          .should('eq','3')

        cy.get('[data-test=goto-prev]')
          .click()

        cy.get('[data-test=test-question]')
          .should('have.text','Q2')

        cy.get('[data-test=answer-fieldset]')
          .contains('A2')

        cy.get('[data-test=progress-bar]')
          .invoke('attr','value')
          .should('eq','2')
    })

    it('shows answers in the same order each time', () => {
        cy.get('[data-test=topic-1]')
          .click()

        cy.get('[data-test=answer1]').parent().find('label').then(($answer) => {
            cy.wrap($answer.text()).as('answer11');
        });
        cy.get('[data-test=answer2]').parent().find('label').then(($answer) => {
            cy.wrap($answer.text()).as('answer12');
        });
        cy.get('[data-test=answer3]').parent().find('label').then(($answer) => {
            cy.wrap($answer.text()).as('answer13');
        });
        cy.get('[data-test=answer4]').parent().find('label').then(($answer) => {
            cy.wrap($answer.text()).as('answer14');
        });

        cy.get('[data-test=goto-next]')
          .click()
        
        cy.get('[data-test=answer1]').parent().find('label').then(($answer) => {
            cy.wrap($answer.text()).as('answer21');
        });
        cy.get('[data-test=answer2]').parent().find('label').then(($answer) => {
            cy.wrap($answer.text()).as('answer22');
        });
        cy.get('[data-test=answer3]').parent().find('label').then(($answer) => {
            cy.wrap($answer.text()).as('answer23');
        });
        cy.get('[data-test=answer4]').parent().find('label').then(($answer) => {
            cy.wrap($answer.text()).as('answer24');
        });

        cy.get('[data-test=goto-prev]')
          .click()

        cy.get('@answer11').then((answer11) => {
            cy.get('[data-test=answer1]')
              .parent()
              .find('label')
              .should('have.text',answer11)
        })
        cy.get('@answer12').then((answer12) => {
            cy.get('[data-test=answer2]')
              .parent()
              .find('label')
              .should('have.text',answer12)
        })
        cy.get('@answer13').then((answer13) => {
            cy.get('[data-test=answer3]')
              .parent()
              .find('label')
              .should('have.text',answer13)
        })
        cy.get('@answer14').then((answer14) => {
            cy.get('[data-test=answer4]')
              .parent()
              .find('label')
              .should('have.text',answer14)
        })

        cy.get('[data-test=goto-next]')
           .click()

        cy.get('@answer21').then((answer21) => {
            cy.get('[data-test=answer1]')
              .parent()
              .find('label')
              .should('have.text',answer21)
        })
        cy.get('@answer22').then((answer22) => {
            cy.get('[data-test=answer2]')
              .parent()
              .find('label')
              .should('have.text',answer22)
        })
        cy.get('@answer23').then((answer23) => {
            cy.get('[data-test=answer3]')
              .parent()
              .find('label')
              .should('have.text',answer23)
        })
        cy.get('@answer24').then((answer24) => {
            cy.get('[data-test=answer4]')
              .parent()
              .find('label')
              .should('have.text',answer24)
        })
    })

    it('displays the users choices when moving between questions', () => {
        cy.get('[data-test=topic-1]')
          .click()

        cy.get('[data-test=answer1]')
          .click()

        cy.get('[data-test=goto-next]')
          .click()

        cy.get('[data-test=answer3]')
          .click()
        
        cy.get('[data-test=goto-prev]')
          .click()
        
        cy.get('[data-test=answer1]')
          .should('be.checked')

        cy.get('[data-test=goto-next]')
          .click()

        cy.get('[data-test=answer3]')
          .check()
          .should('be.checked')
    })
})