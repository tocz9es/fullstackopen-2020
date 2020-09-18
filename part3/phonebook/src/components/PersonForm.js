import React from 'react'

const PersonForm = ({
  nameVal,
  numberVal,
  nameChange,
  numberChange,
  newPerson,
}) => {
  return (
    <form onSubmit={newPerson}>
      <div>
        name: <input value={nameVal} onChange={nameChange} />
      </div>
      <div>
        number: <input value={numberVal} onChange={numberChange} /> (format: XXX-XXX-XXXX)
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm