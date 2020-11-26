import React, { useEffect, useRef } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Users from './components/Users'
import { initializeUser, userLogout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'
import User from './components/User'
import BlogList from './components/BlogList'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const blogFormRef = useRef()

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const classes = useStyles()

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Container className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Blog App
            <Button color="secondary" component={Link} to="/">
              blogs
            </Button>
            <Button color="secondary" component={Link} to="/users">
              users
            </Button>
          </Typography>
          <Typography variant="body1" color="inherit" style={{ marginRight: 10 }}>
            Logged In: {user.name}
          </Typography>
          <Button color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Notification />

      <Switch>
        <Route path="/blogs/:id">
          <Blog blogs={blogs} />
        </Route>
        <Route path="/users/:id">
          <User users={users} />
        </Route>
        <Route path="/users">
          <Typography variant="h2" gutterBottom>
            Users
          </Typography>
          <Users users={users} />
        </Route>
        <Route path="/">
          <Typography variant="h2" gutterBottom>
            Blogs
          </Typography>
          <Togglable
            showLabel="create new blog"
            hideLabel="cancel"
            ref={blogFormRef}
          >
            <BlogForm />
          </Togglable>
          <BlogList blogs={blogs} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App