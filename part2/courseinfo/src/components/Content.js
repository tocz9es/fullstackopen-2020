import React from 'react'

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  return (
    <p style={{ fontWeight: `bold` }}>
      total of {parts.reduce((i, j) => i + j.exercises, 0)} exercises
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={parts} />
    </div>
  )
}

export default Content
