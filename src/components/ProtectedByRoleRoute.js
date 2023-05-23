import React, { useContext } from 'react'
import { AuthenticationContext } from '../context/context'
import { Navigate } from 'react-router-dom'

function ProtectedByRoleRoute ({children,role}) {
  const [authState, setAuthState] = useContext(AuthenticationContext);
  const roles=authState.roles;
  if(roles.includes(role)) {
    return children;
  } else {
    return (<Navigate to={"/notAuthorized"}></Navigate>);
  }
}

export default ProtectedByRoleRoute