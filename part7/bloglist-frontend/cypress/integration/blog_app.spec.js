const user = {
  name: 'test_user',
  username: 'test',
  password: 'test',
}

const firstBlog = {
  title: 'Overreacted',
  author: 'Dan Abramov',
  url: 'https://overreacted.io/',
}

const secondBlog = {
  title: 'SamanthaMing.com',
  author: 'Samantha Ming',
  url: 'https://www.samanthaming.com/',
  likes: 31,
}

const thirdBlog = {
  title: "Sukka's Blog",
  author: 'Sukka',
  url: 'https://blog.skk.moe/',
  likes: 17,
}

describe('Blog app', function ()  {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  describe('initial page', function () {
    it('front page can be opened', function () {
      cy.contains('Log in to Blogs')
      cy.contains('username')
      cy.contains('password')
    })
  })

  describe('using login form', function () {
    it('login form without username and password will show errors', function () {
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', `${user.user} logged in`)
    })

    it('login fails with wrong password', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', `${user.user} logged in`)
    })

    it('login successful with correct username and password', function ()  {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('test_user logged in')
      cy.contains('Logout')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
      cy.addBlog({ ...firstBlog })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type(secondBlog.title)
      cy.get('#author').type(secondBlog.author)
      cy.get('#url').type(secondBlog.url)
      cy.get('#create-button').click()
      cy.get('.success')
        .should('contain', `a new blog ${secondBlog.title} by ${secondBlog.author} added`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('current blog can be liked', function () {
      cy.contains(`${firstBlog.title} ${firstBlog.author}`)
      cy.get('.detail-button').click()
      cy.get('.like-button').click()
      cy.get('.success')
        .should('contain', `You 👍 blog: ${firstBlog.title}`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('current blog can be removed', function () {
      cy.contains(`${firstBlog.title} ${firstBlog.author}`)
      cy.get('.detail-button').click()
      cy.get('.remove-button').click()
      cy.get('.success')
        .should('contain', `You 🗑️ blog: ${firstBlog.title}`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('most like blog will be on the front', function () {
      cy.addBlog({ ...secondBlog })
      cy.addBlog({ ...thirdBlog })

      cy.get('.detail-button').click({ multiple: true })
      cy.get('.likes').then((likes) => {
        let firstBlogLikes = parseInt(likes.eq(0).text().substring(7, 9))
        let secondBlogLikes = parseInt(likes.eq(1).text().substring(7, 9))
        let thirdBlogLikes = parseInt(likes.eq(2).text().substring(7, 9))

        expect(firstBlogLikes).to.be.gte(secondBlogLikes)
        expect(secondBlogLikes).to.be.gte(thirdBlogLikes)

        cy.request({
          method: 'GET',
          url: 'http://localhost:3003/api/blogs',
        }).then(({ body }) => {
          expect(body[0].likes).to.be.gte(thirdBlogLikes)
          expect(body[1].likes).to.be.gte(firstBlogLikes)
          expect(body[2].likes).to.be.gte(secondBlogLikes)
        })
      })
    })
  })
})