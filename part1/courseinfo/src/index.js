import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    props.parts.map((item) => (
      <Part name={item.partName} exercises={item.partExercises}></Part>
    ))
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>Name: {name}, Exercises: {exercises}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises: {props.parts.length}</p>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const parts = [
    {
      partName: 'Fundamentals of React',
      partExercises: 10,
    },
    {
      partName: 'Using props to pass data',
      partExercises: 7,
    },
    {
      partName: 'State of a component',
      partExercises: 14,
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
