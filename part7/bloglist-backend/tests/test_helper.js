const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Google Developers Blog',
    author: 'Google',
    url: 'https://developers.googleblog.com/',
    likes: 31
  },
  {
    title: 'Sukka\'s Blog',
    author: 'sukka',
    url: 'https://blog.skk.moe/',
    likes: 179
  }
]

const initialUsers = [
  {
    username: 'test',
    name: 'test_user',
    password: 'test_user'
  },
  {
    username: 'demo',
    name: 'demo_user',
    password: 'demo_user'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'LWL 的自由天空',
    author: 'lwl12',
    url: 'https://blog.lwl12.com/',
    likes: 179,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
}