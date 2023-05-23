import React from 'react'

function NotAuthorized (props) {
  return (
    <div className={'p-3'}>
      <div className={"alert alert-danger"}>
        Not authorized
      </div>
    </div>
  )
}

export default NotAuthorized