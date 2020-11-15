import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
  const compareVotes = (a1, a2) => a2.votes - a1.votes

  switch (action.type) {
    case 'INIT':
      return action.data.sort(compareVotes)
    case 'CREATE':
      return [...state, action.data].sort(compareVotes)
    case 'VOTE':
      let voteAnecdote = state.filter(
        (anecdote) => anecdote.id === action.data.id
      )[0]
      voteAnecdote = {
        ...voteAnecdote,
        votes: voteAnecdote.votes + 1,
      }
      return [
        ...state.filter((anecdote) => anecdote.id !== action.data.id),
        voteAnecdote,
      ].sort(compareVotes)
    default:
      return state.sort(compareVotes)
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id },
    })
  }
}

export default reducer