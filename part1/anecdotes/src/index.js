import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array.from(Array(anecdotes.length), () => 0)
  )

  const randomAnecdote = () => {
    const randIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randIndex)
  }

  const voteAnecdotes = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  const fetchMostVotes = (votes) => {
    let mostVotesIndex = 0, mostVotes = 0
    mostVotesIndex = votes.indexOf(Math.max(...votes))
    mostVotes = Math.max(...votes)

    return [mostVotesIndex, mostVotes]
  }

  const [mostVotesIndex, mostVotes] = fetchMostVotes(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} vote(s)</p>
      <button onClick={voteAnecdotes}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
