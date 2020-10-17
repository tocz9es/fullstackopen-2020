const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')

//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const { token } = request
  const body = request.body
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  // save blog post with user id
  const savedBlog = await blog.save()
  // modify current user and add new blog post
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { token } = request
  const { id } = request.params
  const { title, author, url, likes } = request.body

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)

  const userHasCurrentBlog = blog.user.toString() === user.id.toString()

  if (user && userHasCurrentBlog) {
    const modifiedBlog = { title, author, url, likes }

    const updatedBlog = await Blog.findByIdAndUpdate(id, modifiedBlog, {
      new: true,
    })

    response.json(updatedBlog.toJSON())
  } else {
    response.status(403).json({ error: 'this blog post not belongs to current user' })
  }

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

module.exports = blogsRouter