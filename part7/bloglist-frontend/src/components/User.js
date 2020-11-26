import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'

const User = ({ users }) => {
  const { id } = useParams()
  const user = users ? users.find(user => user.id === id) : null

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h5" gutterBottom>
        added blogs
      </Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User