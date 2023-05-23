import React, { useContext, useEffect, useState } from 'react'
import {useForm} from "react-hook-form";
import { AuthenticationContext, ProductsContext } from '../context/context'
import CustomModalAlert from './CustomModalAlert'
import { useHttpClient, useProductsApi } from '../api/api'

function NewProduct(props) {
  const {
    register, handleSubmit, watch, setValue, formState: {errors, isValid}
  } = useForm({
    defaultValues: {name: "", price: 0, checked: true}
  });

  const [alertState, setAlertState] = useState({
    show : false,
    title:"",
    message:"",
    close : handleCloseModal
  });
  const [state,setState] =useContext(ProductsContext);
  const [authState,setAuthState] = useContext(AuthenticationContext);
  let httpClient = useHttpClient(authState.token)
  const productsApi = useProductsApi(httpClient);
  const onSubmit=(data)=> {
    productsApi.saveProduct(data)
      .then(resp=>{
        setAlertState({
          ...alertState, show: true,
          message: JSON.stringify(resp.data),
          title: "Product saved successfully"
        })
      })
  }
  function handleCloseModal(){
    setAlertState({...alertState, show: false});
  }
  return (
    <div className={"p-3"}>
      <div className={"card"}>
        <div className={"card-body"}>
          <div className={"col-md-6"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={"mb-3"}>
                <label className={"form-label"}>Name</label>
                <input {...register("name", {
                  required: "The name is required",
                  minLength: {value: 3, message: "The min length is : 4"}
                })} type="text" className="form-control"/>
                <span className={"text-danger"}>
                            {errors.name?.message}
                          </span>
              </div>
              <div className={"mb-3"}>
                <label className={"form-label"}>Price</label>
                <input {...register("price")} type="text" className="form-control"/>
              </div>
              <div className={"mb-3"}>
                <label className={"form-label"}>Checked</label>
                <input {...register("checked")} type="checkbox" className="form-check"/>
              </div>
              <button type={"submit"} className={"btn btn-primary"}>Save</button>
            </form>
          </div>
        </div>
      </div>
      <CustomModalAlert
        show={alertState.show}
        close={alertState.close}
        messsage={alertState.message}
        title={alertState.title}
      >

      </CustomModalAlert>
    </div>
  );
}

export default NewProduct;