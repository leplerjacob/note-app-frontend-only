import React from 'react'

const Notification = ({ props }) => {
  const message = props.message
  const type = props.type
  return type ? (
    <div>
      <div className="success">{message}</div>
    </div>
  ) : (
    <div>
      <div className="error">{message}</div>
    </div>
  )
}

export default Notification
