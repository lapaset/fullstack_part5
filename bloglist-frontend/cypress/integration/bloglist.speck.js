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
        .and('have.css', 'background-color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tesTperson', password: 'secret' })
    })

    it('new note button can be pressed', function() {
      cy.get('#new-note-button').click()
      cy.contains('Create new')
    })

    it('a blog can be created', function() {
      cy.get('#new-note-button').click()
      cy.get('#title').type('This is title')
      cy.get('#author').type('Author McAuthor')
      cy.get('#url').type('www.blog.fi')
      cy.get('#create-blog-button').click()
      cy.get('#user-blogs')
        .should('contain', 'This is title Author McAuthor')
    })

    describe('when a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'This is title',
          author: 'Author McAuthorface',
          url: 'www.blog.fi',
          likes: 0
        })
      })

      it('it can be liked', function() {
        cy.get('#show-blog-details-button').click()
        cy.contains('likes: 0')
        cy.get('#like-button').click()
        cy.contains('likes: 1')
      })

      it('it can be removed by the user that created it', function() {
        cy.get('#show-blog-details-button').click()
        cy.get('#remove-blog-button').click()
        cy.get('#user-blogs')
          .should('not.contain', 'This is title Author McAuthor')
      })
    })

    describe('when multiple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'First title',
          author: 'Author McAuthorface',
          url: 'www.blog.fi',
          likes: 0
        })
        cy.createBlog({
          title: 'Second title',
          author: 'Author McAuthorface',
          url: 'www.blog.fi',
          likes: 281973281
        })
        cy.createBlog({
          title: 'Third title',
          author: 'Author McAuthorface',
          url: 'www.blog.fi',
          likes: 3000
        })
      })

      it('they are sorted by the amount of likes', function() {
        cy.get('li').then( blogs => {
          cy.wrap(blogs[0]).should('contain', 'Second title')
          cy.wrap(blogs[1]).should('contain', 'Third title')
          cy.wrap(blogs[2]).should('contain', 'First title')
        })
      })

    })
    
  })
})