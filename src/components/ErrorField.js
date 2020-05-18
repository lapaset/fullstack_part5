import React from 'react'

const ErrorField = ({ message }) => {
  return message === null
    ? null
    : <div className="errorField">
        Error: {message}
      </div>
}

export default ErrorField