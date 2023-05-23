import React, { useContext, useEffect } from 'react'
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import { AuthenticationContext } from '../context/context'
import { useHttpClient, useProductsApi } from '../api/api'

function EditProduct(props) {
  const {
    register, handleSubmit, watch, setValue, formState: {errors, isValid}
  } = useForm({
    defaultValues: {name: "", price: 0, checked: true}
  });
  const {id}=useParams();
  const [authState,setAuthState] = useContext(AuthenticationContext);
  let httpClient = useHttpClient(authState.token)
  const productsApi = useProductsApi(httpClient);
  useEffect(() => {
    productsApi.getProductById(id)
      .then(resp=>{
        setValue("name",resp.data.name);
        setValue("price",resp.data.price);
        setValue("checked",resp.data.checked);
      })
  }, []);



  function onSubmit(data) {
    productsApi.updateProduct(id,data)
      .then(resp=>{
        alert(JSON.stringify(resp.data));
      })
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
    </div>
  );
}

export default EditProduct;