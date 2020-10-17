const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')

let userToken
let userId

beforeAll(async () => {
  // delete and create user
  await User.deleteMany({})

  const userResponse = await api
    .post('/api/users')
    .send(helper.initialUsers[0])
  const loginResponse = await api
    .post('/api/login')
    .send(helper.initialUsers[0])
  userToken = await loginResponse.body.token
  userId = await userResponse.body.id
})

beforeEach(async () => {
  // delete and create blog posts
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = await new Blog({
      ...blog,
      user: userId,
    })

    await blogObject.save()
  }
})

describe('initial blogs fetch', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map((r) => r.title)

    expect(contents).toContain('Google Developers Blog')
  })

  test('unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('viewing a specific blog', () => {
  test('fetch a blog post with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('failed to fetch a blog post with a non-exist id', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404) // Not Found
  })

  test('failed to fetch a blog post with invalid id', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400) // Bad request
  })
})

describe('addition of a blog post', () => {
  test('a blog post can be created', async () => {
    const newBlog = {
      title: 'LWL 的自由天空',
      author: 'lwl12',
      url: 'https://blog.lwl12.com/',
      likes: 179,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('LWL 的自由天空')
  })

  test('failed to create a blog post with not login user', async () => {
    const newBlog = {
      title: 'LWL 的自由天空',
      author: 'lwl12',
      url: 'https://blog.lwl12.com/',
      likes: 179,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('a blog without title and url cannot be created', async () => {
    const newBlog = {
      author: 'sample',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userToken}`)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('modification of a blog post', () => {
  test('succeeds to modify a blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]

    console.log(await helper.usersInDb())
    console.log(blogToModify.id)

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .set('Authorization', `bearer ${userToken}`)
      .send({ likes: 12 })
      .expect(200)

    const fetchedBlogs = await helper.blogsInDb()
    const updatedBlog = fetchedBlogs[0]

    expect(updatedBlog.likes).toBe(12)
  })

  test('failed to modify a blog post with non-exist id', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .put(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${userToken}`)
      .send({ likes: 12 })
      .expect(400) // Bad Request
  })
})

describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map((r) => r.title)

    expect(title).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})