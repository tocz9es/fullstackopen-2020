import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, TextField, Button } from '@material-ui/core'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const toggleCreate = async (e) => {
    e.preventDefault()
    setTitle('')
    setAuthor('')
    setUrl('')
    await dispatch(createBlog({ title, author, url }))
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Create New Blog
      </Typography>
      <form onSubmit={toggleCreate}>
        <div>
          <TextField
            style={{ margin: 8 }}
            fullWidth
            label="title"
            variant="outlined"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            style={{ margin: 8 }}
            fullWidth
            label="author"
            variant="outlined"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            style={{ margin: 8 }}
            fullWidth
            label="url"
            variant="outlined"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default BlogForm