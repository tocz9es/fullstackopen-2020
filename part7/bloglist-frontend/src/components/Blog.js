import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Typography, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  const { id } = useParams()
  const blog = blogs ? blogs.find((blog) => blog.id === id) : null

  const dispatch = useDispatch()
  const history = useHistory()

  const [comment, setComment] = useState('')

  const toggleLike = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const toggleRemove = () => {
    if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author} ?`)) {
      dispatch(removeBlog(blog))
      history.push('/')
    }
  }

  const toggleComment = () => {
    dispatch(commentBlog({ blog, comment }))
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
        onClick={toggleLike}
      >
        Like
      </Button>
      <Button variant="contained" color="primary" onClick={toggleRemove}>
        Remove
      </Button>
      <Typography variant="h6" gutterBottom style={{ marginTop: 10 }}>
        Comments
      </Typography>
      <TextField
        style={{ margin: 8 }}
        fullWidth
        label="Comment"
        variant="outlined"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={toggleComment}
      >
        Publish Comment
      </Button>
      <List>
        {blog.comments.map((comment, index) =>
          <ListItem key={index}>
            <ListItemText>
              {comment}
            </ListItemText>
          </ListItem>
        )}
      </List>
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default Blog
