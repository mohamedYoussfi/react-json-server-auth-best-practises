
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"

import React, { Component, useState } from 'react'
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import Home from "./components/Home";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import DashBoard from './components/DashBoard'
import { AuthenticationContext, ProductsContext, useAuthState, useProductsState } from './context/context'
import Login from './components/Login'
import Catalog from './components/Catalog'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedByRoleRoute from './components/ProtectedByRoleRoute'
import NotAuthorized from './components/NotAuthorized'

function App() {
  const productsState = useProductsState();
  const authState = useAuthState();
  return (
    <AuthenticationContext.Provider value={authState}>
    <ProductsContext.Provider value={productsState}>
    <BrowserRouter>
      <AppNavBar></AppNavBar>
      <Routes>
        <Route index element={<Login></Login>}></Route>
        <Route path={"login"} element={<Login></Login>}></Route>
        <Route path={"notAuthorized"} element={
          <ProtectedRoute>
            <NotAuthorized></NotAuthorized>
          </ProtectedRoute>
        }></Route>
        <Route path={"home"} element={<Home></Home>}></Route>
        <Route path={"catalog"} element={
          <ProtectedRoute>
            <Catalog></Catalog>
          </ProtectedRoute>
        }
        >
          <Route path={"products"} element={<Products></Products>}></Route>
          <Route path={"newProduct"} element={
            <ProtectedByRoleRoute role={"ADMIN"}>
              <NewProduct></NewProduct>
            </ProtectedByRoleRoute>
          }></Route>
          <Route path={"editProduct/:id"} element={
            <ProtectedByRoleRoute role={"ADMIN"}>
              <EditProduct></EditProduct>
            </ProtectedByRoleRoute>
          }></Route>

        </Route>
      </Routes>
    </BrowserRouter>
    </ProductsContext.Provider>
    </AuthenticationContext.Provider>
  );
}

export default App;