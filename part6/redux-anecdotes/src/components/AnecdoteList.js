import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // using hook-api

  // const dispatch = useDispatch()
  // const anecdotes = useSelector(
  //   state => state.anecdotes.filter(
  //     anecdote => anecdote.content
  //       .toLowerCase()
  //       .includes(state.filter.toLowerCase())
  //   )
  // )

  // const toggleVote = (anecdote) => {
  //   dispatch(voteAnecdote(anecdote))
  //   dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  // }

  // const toggleVote = (anecdote) => {
  //   props.voteAnecdote(anecdote)
  //   props.setNotification(`You voted '${anecdote.content}'`, 5)
  // }

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => props.toggleVote(anecdote)}>Vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

// using connect function

// const mapDispatchToProps = {
//   voteAnecdote,
//   setNotification
// }

const mapDispatchToProps = (dispatch) => {
  return {
    toggleVote: value => {
      dispatch(voteAnecdote(value))
      dispatch(setNotification(`You voted '${value.content}'`, 5))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(
      anecdote => anecdote.content
        .toLowerCase()
        .includes(state.filter.toLowerCase())
    )
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

// const ConnectedAnecdotes = connect(
//   mapStateToProps,
//   { voteAnecdote, setNotification }
// )(AnecdoteList)

export default ConnectedAnecdotes

// using hook-api

// export default AnecdoteList