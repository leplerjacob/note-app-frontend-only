describe('Note app', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
  })
})
