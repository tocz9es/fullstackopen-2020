import React from 'react'

import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => {
  return (
    <div>
      <h1>Half Stack application development</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </div>
  )
}

export default Course