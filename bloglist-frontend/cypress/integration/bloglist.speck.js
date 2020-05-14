describe('Bloglist', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'tesTperson',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.get('h2')
      .should('contain', 'Log in')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tesTperson')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.get('.notificationField').should('contain', 'Logged in as tesTperson')
    })

    it('login fails with wrong username', function() {
      cy.get('#username').type('tesTpers')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.get('.errorField').should('contain', 'Invalid username or password')
    })

    it('login fails with wrong password', function() {
      cy.get('#username').type('tesTperson')
      cy.get('#password').type('Secret')
      cy.get('#login-button').click()
      cy.get('.errorField')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'background-color', 'rgb(0, 0, 0)')

    })
  })
})