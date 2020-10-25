import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchSortedBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const fetchSortedBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  const userLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (e) {
      setMessage({
        type: 'error',
        msg: 'wrong username or password',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.create({ ...blogObject, likes: 0 })
      setBlogs(blogs.concat(addedBlog))
      setMessage({
        type: 'success',
        msg: `a new blog ${addedBlog.title} by ${addedBlog.author} added`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (e) {
      setMessage({
        type: 'error',
        msg: 'add new blog failed',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (likeBlog) => {
    try {
      const likedBlog = await blogService.update(likeBlog)
      await fetchSortedBlogs()
      setMessage({
        type: 'success',
        msg: `You 👍 blog: ${likedBlog.title}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (e) {
      console.log(e)
      setMessage({
        type: 'error',
        msg: 'like blog failed',
      })
    }
  }

  const removeBlog = async (removeBlog) => {
    try {
      await blogService.remove(removeBlog)
      await fetchSortedBlogs()
      setMessage({
        type: 'success',
        msg: `You 🗑️ blog: ${removeBlog.title}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (e) {
      console.log(e)
      setMessage({
        type: 'error',
        msg: 'remove blog failed',
      })
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />

        <LoginForm handleLogin={userLogin} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={message} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>

      <Togglable showLabel="create new blog" hideLabel="cancel" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleLike={likeBlog} handleRemove={removeBlog} />
      ))}
    </div>
  )
}

export default App