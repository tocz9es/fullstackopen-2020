import React, { useState, useImperativeHandle } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleStyle = { display: visible ? 'block': 'inline-block' }
  const hideWhenVisible = { display: visible ? 'none' : 'inline-block' }
  const showWhenVisible = { display: visible ? null : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={toggleStyle}>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.showLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.hideLabel}
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable