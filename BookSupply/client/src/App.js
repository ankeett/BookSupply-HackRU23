import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./component/Home/Home"
import SignUpIn from './component/Authentication/SignUpIn';
import Activate from "./component/Authentication/Activate.js"
import Welcome from "./component/Welcome/Welcome.js"
import ResetPw from "./component/Authentication/ResetPw.js"
import ForgotPw from  "./component/Authentication/ForgotPw.js"
import { useSelector } from 'react-redux';
import CheckActivate from './component/Authentication/CheckActivate';
import ChangePassword from './component/Authentication/ChangePassword';
import Sell  from './component/Sell/Sell';
import Navbar from './component/Navbar/Navbar';
import  Logout from './component/Authentication/Logout'
import BuyerSignUp from './component/Authentication/SellerSignUp';
import NotFound from './component/Error/NotFound';
import CheckForget from './component/Authentication/CheckForget';
import SellHome from './component/Sell/SellHome';
import Footer from './component/Footer/Footer';
import ActivateCompany from './component/Authentication/ActivateCompany';
import ChangeCompanyPassword from './component/Authentication/ChangeCompanyPassword';
import Product from './component/Product/Product';
import SuccessfulLogout from './component/Authentication/SuccessfulLogout';
import Cart from './component/Cart/Cart';
import Settings from './component/Dashboard/Settings';
import Inventory from './component/Dashboard/Inventory';
import Orders from './component/Dashboard/Orders';
import SquarePayment from './component/Checkout/SquarePayment';
import Shipping from './component/Checkout/Shipping';
import Update from './component/Dashboard/Update';
import DummyBuy from './component/Buy/Buy';
import React, {useEffect, useState} from 'react';  
import Confirmation from './component/Checkout/Confirmation';

function App() {
  const {isAuthenticated, user} = useSelector(state=>state.user)
  const navLink = user?.role === 'company' ? "/sell" : "/sell/home";

  
  return (
   <div>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {/* //check if activated */}
        {isAuthenticated && !user.isActivated &&  <Route exact path = '/checkActivate' element = {<CheckActivate/>}/> }
        <Route exact path = '/' element = {<Welcome/>}/>
        <Route exact path = '/home' element = {<Home/>}/>
        <Route exact path = '/buy' element = {<DummyBuy/>}/>
        <Route exact path = '/sell/home' element = {<SellHome/>}/>
        {/* //Listing page only for sellers */}
        {
          user?.role === 'company' ?
          <Route exact path ='/sell' element = {<Sell/>}/>
          :
          <Route exact path ='/sell' element = {<SellHome/>}/>

        }
        <Route exact path = '/seller/register' element={<BuyerSignUp/>}/>
        <Route exact path = '/confirmation' element={<Confirmation/>}/>

        <Route exact path = '/checkForget' element = {<CheckForget/>}/>
        <Route exact path = '/signin' element = {<SignUpIn/>}/>
        <Route exact path = '/logout' element = {<Logout/>}/>
        <Route exact path='/logout/successful' element={<SuccessfulLogout/>}/>
        {user?.role =="user" && <Route exact path = '/api/v1/account/activate/:token' element = {<Activate/>}/>}
        {user?.role =="company" && <Route exact path = '/api/v1/company/account/activate/:token' element = {<ActivateCompany/>}/>}
        <Route exact path = '/api/v1/password/forgot/' element = {<ForgotPw/>}/>
        <Route exact path = '/api/v1/password/reset/:token' element = {<ResetPw/>}/>
        {user?.role =="user" && <Route exact path = '/changePassword' element={<ChangePassword/>}/>}
        {user?.role =="company" && <Route exact path = '/changeCompanyPassword' element={<ChangeCompanyPassword/>}/>}

        <Route exact path ="/product/:id" element={<Product/>}/>
        {user?.role ==="user" && <Route exact path='/cart' element={<Cart/>}/>}
        {user?.role =="user" && <Route exact path ='/payment' element={<SquarePayment/>}/>}
        {user?.role =="user" && <Route exact path ='/shipping' element={<Shipping/>}/>}
        {user?.role =="company" &&<Route exact path='/update/:id' element={<Update/>}/>}
        

        {
          isAuthenticated && user?.role === "company" &&
         <>
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/orders' element={<Orders/>}/>
          </>
        }
        
        <Route path='settings' element={<Settings/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
   </div>
  )
}

export default App;
