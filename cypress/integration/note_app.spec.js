describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    const user = {
      name: 'John Doe',
      username: 'root',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong Credentials')
    //     cy.get('.error').should('contain', 'wrong credentials')
    //   cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    //   cy.get('.error').should('have.css', 'border-style', 'solid')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
    cy.contains('John Doe logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'password' })
    })

    it('new note can be created', function () {
      cy.contains('new note').click()
      cy.get('#new-note').type('Testing input of new note')
      cy.get('#submit-note-button').click()

      cy.contains('Testing input of new note')
    })

    describe('when notes included', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
      it('note can be made important', function () {
        cy.contains('first note').find('button:first-child').click()
        cy.contains('first note').contains('make not important')
      })
      it('non-test retrieves number of buttons', () => {
        cy.contains('note').parent().find('button').then((buttons) => {
          console.log('number of buttons:', buttons.length)
          cy.wrap(buttons[0]).click()
        })
      })
    })
  })
})
