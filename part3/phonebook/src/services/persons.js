import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const createPerson = (data) => {
  return axios.post(baseUrl, data)
}

const updatePerson = (data) => {
  return axios.put(`${baseUrl}/${data.id}`, data)
}

const deletePerson = (data) => {
  return axios.delete(`${baseUrl}/${data}`)
}

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
}
