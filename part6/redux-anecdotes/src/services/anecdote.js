import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const create = async (content) => {
  const response = await axios.post(baseURL, { content, votes: 0 })
  return response.data
}

const vote = async (anecdote) => {
  console.log(anecdote)
  const response = await axios.put(`${baseURL}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  })
  return response.data
}

export default { getAll, create, vote }