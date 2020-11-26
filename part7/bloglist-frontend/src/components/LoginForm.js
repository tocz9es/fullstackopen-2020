import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { userLogin } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const login = (event) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Log in to Blogs</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <form onSubmit={login}>
        <div>
          <TextField
            style={{ marginBottom: 8 }}
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            style={{ marginBottom: 8 }}
            fullWidth
            label="Password"
            variant="outlined"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm