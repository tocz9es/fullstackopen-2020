import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
  
const AnecdoteFilter = (props) => {
  // using hook-api

  // const dispatch = useDispatch()

  const handleChange = (event) => {
    // dispatch(setFilter(event.target.value))
    props.setFilter(event.target.value)
  }

  return (
    <div>
      <span>filter</span>
      <input type="text" onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const ConnectedAnecdoteFilter = connect(
  null,
  mapDispatchToProps
)(AnecdoteFilter)

export default ConnectedAnecdoteFilter

// using hook-api

// export default AnecdoteFilter