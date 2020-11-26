import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  const { id } = useParams()
  const blog = blogs ? blogs.find((blog) => blog.id === id) : null

  const dispatch = useDispatch()

  const history = useHistory()

  const toggleLike = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const toggleRemove = () => {
    if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author} ?`)) {
      dispatch(removeBlog(blog))
      history.push('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {blog.title} - {blog.author}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        URL: <a href={blog.url}>{blog.url}</a>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Likes: {blog.likes}
      </Typography>
      <Button
        style={{ marginRight: 8 }}
        variant="contained"
        color="primary"
        className="like-button"
        onClick={toggleLike}
      >
        Like
      </Button>
      <Button
        variant="contained"
        color="primary"
        className="remove-button"
        onClick={toggleRemove}
      >
        Remove
      </Button>
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default Blog
