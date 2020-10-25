import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {

  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    margin: '5px 0',
  }

  const likeBlog = () => {
    handleLike({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlog = () => {
    if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author} ?`)) {
      handleRemove(blog)
    }
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div className='likes'>
        Likes: {blog.likes}
        <button className='like-button' onClick={likeBlog}>Like</button>
      </div>
      <button className='remove-button' onClick={removeBlog}>Remove</button>
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      <div style={{ display: 'inline-block' }}>
        {blog.title} {blog.author}
      </div>
      <button className='detail-button' onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? 'Hide': 'Show'}
      </button>
      {showDetail ? details(): null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog
