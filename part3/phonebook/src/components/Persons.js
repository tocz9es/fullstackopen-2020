import React from 'react'

const Persons = ({ filtered, deletePerson }) => {
  return (
    <div>
      {filtered.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={deletePerson(person)}>delete</button>
        </p>
      ))}
    </div>
  )
}

export default Persons