import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import { AuthenticationContext, getProducts, ProductsContext } from '../context/context'
import { wait } from '@testing-library/user-event/dist/utils'
import { productsApi, useHttpClient, useProductsApi } from '../api/api'

function Products(props) {

  const [state,setState] =useContext(ProductsContext);
  const [authState,setAuthState] = useContext(AuthenticationContext);
  const [keyword, setKeyword] = useState("");
  let httpClient = useHttpClient(authState.token)
  const productsApi = useProductsApi(httpClient);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts({})
  }, []);

  function getProducts({query =state.keyword, page = state.currentPage, size = state.pageSize}){
    setState({...state, status:"loading"})
    wait(1000).then(()=>{
      productsApi.getProducts(query,page,size)
        .then(resp=>{
          const totalCount=resp.headers['x-total-count'];
          let totalPages=Math.floor(totalCount/size);
          if(totalCount % size !== 0) {
            ++totalPages;
          }
          setState({
            products:  resp.data,
            currentPage: page,
            pageSize: size,
            keyword: query,
            totalPages: totalPages,
            totalCount:totalCount
          })
        }).catch(err=>{
          setState({...state, status:"error", errorMessage:err.message});
      })
    });
  }
  function handleCheckProduct(product){
      productsApi.checkProduct(product)
      .then(resp=>{
        //product.checked=!product.checked;
        const prods=state.products.map(p=>p.id!==product.id?p:resp.data);
        setState({...state,products: prods});
      })
  }
  function handleDelete(product){
    productsApi.deleteProduct(product)
      .then(resp=>{
        const prods=state.products.filter(p=>p.id!==product.id);
        setState({...state,products: prods});
      })
  }
  function handleEdit(product){
   navigate(`/catalog/editProduct/${product.id}`)
  }
  function handleSearch(){
    getProducts({query:keyword});
  }
  function handleGotoPage(page){
    getProducts({query:keyword, page});
  }
  return (
    <div className={"p-3"}>
      <div className={"card p-3"}>
        <div className={"card"}>
          <div className={"card-body"}>
            <div className={"row"}>
              <div className={"col-auto"}>
                <input value={keyword} onChange={(e)=>setKeyword(e.target.value)} className={"form-control"}/>
              </div>
              <div className={"col-auto"}>
                <button onClick={()=>handleSearch()} className={"btn btn-outline-success"}>
                  <i className={"bi bi-search"}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={"card-body"}>
          <table className={"table"}>
            <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Checked</th>
            </tr>
            </thead>
            <tbody>
            { state.products.map(product => (

             <tr key={product.id}>
               <td>{product.name}</td>
               <td>{product.price}</td>

               <td>
                 {
                   authState.roles.includes("ADMIN") ?
                     <button onClick={() => handleCheckProduct(product)} className={"btn btn-outline-success"}>
                       <i className={product.checked ? "bi bi-check-circle-fill" : "bi bi-circle-fill"}></i>
                     </button>
                     :
                     <i className={product.checked ? "bi bi-check-circle-fill" : "bi bi-circle-fill"}></i>
                 }
               </td>
               {
                 authState.roles.includes("ADMIN")
                 &&
                 <td>
                   <button onClick={() => handleDelete(product)} className={"btn btn-outline-danger"}>
                     <i className={"bi bi-trash"}></i>
                   </button>
                 </td>
               }
               {
                 authState.roles.includes("ADMIN")
                 &&
                 <td>
                   <button onClick={()=>handleEdit(product)} className={"btn btn-outline-success"}>
                     <i className={"bi bi-pencil"}></i>
                   </button>
                 </td>
               }

             </tr>
            ))
            }
            </tbody>
          </table>
          <ul className={"nav nav-pills"}>
            {
              (new Array(state.totalPages).fill(0)).map((p,index)=>(
                <li key={index}>
                  <button
                    onClick={()=>handleGotoPage(index+1)}
                    className={(state.currentPage===(index+1))?"btn btn-success ms-1":"btn btn-outline-success ms-1"}>
                    {index+1}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Products;