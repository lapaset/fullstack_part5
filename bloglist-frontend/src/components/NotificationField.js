import React from 'react'

const NotificationField = ({ message }) => {
  return message === null
    ? null
    : <div className="notificationField">
        {message}
    </div>
}

export default NotificationField