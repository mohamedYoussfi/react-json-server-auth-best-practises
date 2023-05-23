import axios from 'axios'

export function useHttpClient(token){
  const http=axios.create({
    baseURL : "http://localhost:9000",
    headers : {
      Accept : "application/json",
    }
  });

  http.interceptors.request.use((request)=>{
    console.log("**** request intercept *****");
    console.log(request);
    request.headers.Authorization=`Bearer ${token};`
    return request;
  },(err)=>{
    console.log(err);
    return (Promise.reject(err));
  });
  http.interceptors.response.use((response)=>{
    console.log("**** response intercept *****");
    console.log(response);
    return response
  },(err)=>{
    console.log(err);
    Promise.reject(err);
  });
  return http;
}
export function useProductsApi(http){
  return{
    getProducts : (query, page, size)=>{
      return http.get(`/products?name_like=${query}&_page=${page}&_limit=${size}`);
    },
    getProductById : (id)=>{
      return http.get(`/products/${id}`);
    },
    checkProduct:(product)=>{
      return http.patch(`/products/${product.id}`, {checked:!product.checked});
    },
    deleteProduct : (product)=>{
      return http.delete(`/products/${product.id}`)
    },
    saveProduct:(product)=>{
      return http.post("/products",product)
    },
    updateProduct:(id,product)=>{
      return http.put(`/products/${id}`,product)
    }
  }
}