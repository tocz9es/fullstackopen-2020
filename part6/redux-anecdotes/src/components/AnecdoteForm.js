import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const [content, setContent] = useState('')

  // using hook-api

  // const dispatch = useDispatch()

  const handleCreate = async (e) => {
    e.preventDefault()
    setContent('')
    // await dispatch(createAnecdote(content))
    await props.createAnecdote(content)
  }

  return (
    <div>
      <h3>Create New</h3>

      <form onSubmit={handleCreate}>
        <div>
          <input
            type="text"
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

// using connect function

const mapDispatchToProps = {
  createAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm

// using hook-api

// export default AnecdoteForm