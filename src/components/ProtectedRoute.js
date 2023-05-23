import React, { useContext } from 'react'
import { AuthenticationContext } from '../context/context'
import { Navigate } from 'react-router-dom'

function ProtectedRoute ({ children }) {
  const [authState]= useContext(AuthenticationContext);
  if(authState.isAuthenticated){
    return  children;
  } else {
    return (<Navigate to={"/login"}></Navigate>);
  }
}

export default ProtectedRoute