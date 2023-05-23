import React, { useContext } from 'react'
import { ProductsContext } from '../context/context'

function StatusIndicator (props) {
  const [state] = useContext(ProductsContext);
  let content="";
  if(state.status==="loading"){
    content=(<div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>);
  } else if(state.status==="error"){
    content=(<div className={"text-danger"}>
      {state.errorMessage}
    </div>)
  }
  return(
  <div className={"p-1"}>
    {content}
  </div>);
}


export default StatusIndicator