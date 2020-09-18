import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then(res => {
      setPersons(res.data)
    })
  }, [])

  const createOrModify = (e) => {
    e.preventDefault()

    const personExist = persons.find(
        (person) =>
          person.name.toLocaleLowerCase() === newName.trim().toLocaleLowerCase()
      )

    if (personExist) {
      const message = `${newName.trim()} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {
        let record = persons.filter((person) => person.name === newName)
        record = { ...record[0], number: newNumber }

        personsService.updatePerson(record).then(() => {
          setPersons(
            persons.filter((person) => person.name !== newName).concat(record)
          )
          setNewName('')
          setNewNumber('')
        }).catch(() => {
          setMessage({
            type: 'error',
            msg: `Information of ${record.name} has already been removed from server`,
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
      }
    } else {
      const person = { name: newName, number: newNumber }
      personsService.createPerson(person).then((res) => {
        setMessage({ type: 'success', msg: `Added ${res.data.name}` })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
      }).catch((err) => {
        setMessage({
          type: 'error',
          msg: err.response.data.error,
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
  }

  const deletePerson = (data) => () => {
    if (window.confirm(`Delete ${data.name} ?`)) {
      personsService
        .deletePerson(data.id)
        .then((res) => {
          console.log(res)
          setPersons(persons.filter((person) => person.id !== data.id))
        })
        .catch((err) => {
          setMessage({
            type: 'error',
            msg: err.response.data.error,
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const filterPersons = filter
    ? persons.filter(person => person.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)
    : persons

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} filterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        nameVal={newName}
        numberVal={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        newPerson={createOrModify}
      />
      <h3>Numbers</h3>
      <Persons filtered={filterPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
