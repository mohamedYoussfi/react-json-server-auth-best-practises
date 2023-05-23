import { createContext, useState } from 'react'

export const ProductsContext = createContext();
export const AuthenticationContext = createContext();

export function useProductsState(){
  return useState({
    products: [],
    keyword: "",
    currentPage: 1,
    pageSize: 4,
    totalPages: 0,
    totalCount: 0,
    status : "",
    errorMessage :""
  });
}
export function useAuthState(){
  return useState({
    isAuthenticated : false,
    username :"",
    roles :[],
    token : "",
    "errorMessage":undefined
  });
}