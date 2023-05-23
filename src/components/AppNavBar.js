import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthenticationContext, ProductsContext } from '../context/context'
import StatusIndicator from './StatusIndicator'
import DashBoard from './DashBoard'

function AppNavBar(props) {
  const [state] = useContext(ProductsContext);
  const navigate=useNavigate();
    const [actions, setActions] = useState([
        {title: "Home", icon: "house", route: "/home", },
        {title: "Products", icon: "house", route: "/catalog/products"},
        {title: "New Product", icon: "house", route: "/catalog/newProduct"},
    ]);
  const [currentAction, setCurrentAction] = useState("");
  const location=useLocation();
  const [authState, setAuthState]= useContext(AuthenticationContext);
  useEffect(() => {
    const path=location.pathname;
    setCurrentAction(path);
  }, []);

  function handleLogout(){
    setAuthState(
      {
        ...authState,
        isAuthenticated:false,
        user:undefined,
        token : undefined

      })
  }

  function handleLogin(){
    navigate("/login");
  }

    return (
        <nav className="p-1 m-1 navbar">
            <ul className="nav nav-pills">
                {
                    actions.map((action, index) => (
                        <li key={index}>
                            <Link to={action.route}  onClick={() => {
                                setCurrentAction(action.route);
                                console.log(currentAction);
                            }}
                               className={currentAction.toLowerCase() == action.route.toLowerCase() ? "btn btn-success ms-1" : "btn btn-outline-success ms-1"}>
                                {action.title}
                                <i className={`bi bi-${action.icon}`}></i>
                            </Link>
                        </li>
                    ))
                }
                <li>
                  <StatusIndicator></StatusIndicator>
                </li>
            </ul >
          <ul className={"nav nav-pills"}>
            {authState.isAuthenticated && (
              <li className={"p-1"}>
                <span className={"m-2"}>{authState.username}</span>
                <button onClick={handleLogout} className={"btn btn-sm btn-outline-success"}>
                  <i className={"bi bi-door-closed-fill"}></i>
                </button>
              </li>
            )}
            {!authState.isAuthenticated && (
              <li className={"p-1"}>
                <button onClick={handleLogin} className={"btn btn-sm btn-outline-success"}>
                  <i className={"bi bi-door-open-fill"}></i>
                </button>
              </li>
            )}

          </ul>
          {authState.isAuthenticated && <DashBoard></DashBoard>}

        </nav>
    );
}

export default AppNavBar;