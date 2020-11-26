import React from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} secondary={blog.author}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListItemText>
            <ListItemSecondaryAction>
              <Button component={Link} to={`/blogs/${blog.id}`}>
                Detail
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogList