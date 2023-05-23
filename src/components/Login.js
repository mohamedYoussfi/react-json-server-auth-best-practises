import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { AuthenticationContext } from '../context/context'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

function Login (props) {
  const [authState, setAuthState] = useContext(AuthenticationContext);
  const {register, handleSubmit, formState : {errors}}=useForm({defaultValues :{username:"",password:""}});
  const navigate = useNavigate();
  const handleLogin=(dataForm)=>{
    axios.get(`http://localhost:9000/users/${dataForm.username}`)
      .then(resp=>{
        if (resp.data.password===btoa(dataForm.password)){
          const decodedJWT=jwtDecode(resp.data.token);
          setAuthState({...authState, isAuthenticated:true, username: decodedJWT.sub, roles:decodedJWT.roles, token : resp.data.token});
          navigate("/catalog/products");
        } else {
          throw new Error("Password not match");
        }
      }).catch(err=>{
        setAuthState({...authState, isAuthenticated: false, errorMessage:err.message});
    });
  }
  return (
    <div className={"p-3"}>
    <div className={"row"}>
      <div className={"col-md-6"}>
        <div className={"card"}>
          <div className={"card-body"}>
            <div className={"p-3"}>
              {
                authState && !(authState.isAuthenticated) && authState.errorMessage
                && (
                  <div className={"alert alert-danger"}>
                    {authState.errorMessage}
                  </div>
                )
              }

              <form onSubmit={handleSubmit(handleLogin)}>
                <div className={"mb-3"}>
                  <label className={"form-label"}>Username:</label>
                  <input
                    className={"form-control"}
                    {...register(
                      "username",
                      {required:"username is required",
                        minLength:{value:3, message:"Min Length is 3"
                        }
                      }
                    )
                    }/>
                  <span className={"text-danger"}>
          {errors.username?.message}
        </span>
                </div>
                <div className={"mb-3"}>
                  <label className={"form-label"}>Password:</label>
                  <input type={"password"}
                         className={"form-control"}
                         {...register(
                           "password",
                           {required:"password is required",
                             minLength:{value:4, message:"Min Length is 4"
                             }
                           }
                         )
                         }/>
                  <span className={"text-danger"}>
          {errors.password?.message}
        </span>
                </div>
                <button className={"btn btn-primary"}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login