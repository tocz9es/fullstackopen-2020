import React from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core'

const UserList = ({ users }) => {
  return (
    <div>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={`${user.blogs.length} blogs created`} />
            <ListItemSecondaryAction>
              <Button component={Link} to={`/users/${user.id}`}>
                Detail
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default UserList