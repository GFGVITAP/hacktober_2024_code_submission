import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav_bar from "./assets/components/Nav_bar"

import UserDashboard from './assets/components/User-dashboard'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './assets/components/Home';

import Calculator from './assets/components/Calculator';
import Signup from './assets/components/Signup';
import Signin from './assets/components/Signin';
import PaymentPage from './assets/components/PaymentPage';

function App() {
  return (
    
   <>
    <BrowserRouter>
      <Nav_bar></Nav_bar>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path='/calculator' element={<Calculator></Calculator>}></Route>
<Route path='/payments' element={<PaymentPage></PaymentPage>}></Route>
      <Route path="/signin" element={<Signin/>} />
    </Routes>
    <ToastContainer theme='light'></ToastContainer>
  </BrowserRouter>
   </>
  );
}

export default App;
