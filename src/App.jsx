import React,{useEffect, useContext} from 'react';
import "./App.css";
import {context} from "./index";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import PasswordReset from './components/auth/PasswordReset.jsx';
import Otp from './components/auth/Otp.jsx';
import Application from './components/application/Application.jsx';
import MyApplication from './components/application/MyApplication.jsx';
import Home from './components/home/Home.jsx';
import JobDetails from './components/job/JobDetails.jsx';
import Jobs from './components/job/Jobs.jsx';
import MyJobs from './components/job/MyJobs.jsx';
import PostJob from './components/job/PostJob.jsx';
import Footer from './components/layout/Footer.jsx';
import Navbar from './components/layout/Navbar.jsx';
import NotFound from './components/notfound/NotFound.jsx';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import apiCall from './http/HttpApp.js';


const App = () => { 
  const {isAuthorized,setIsAuthorized,setUser} = useContext(context);
  useEffect(()=>
  {
     const fetchUser = async() =>
     {
        try {
          const response = await apiCall("api/v1/user/get-user");
          setUser(response)
          setIsAuthorized(true);
          console.log(response);
        } catch (error) {
          setIsAuthorized(false);
        }
     }; 
     fetchUser();
  },[isAuthorized])
  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:token' element={<PasswordReset/>}/>
        <Route path='/otp-varification' element={<Otp/>}/>
        <Route path='/application/:id' element={<Application/>}/>
        <Route path='/application/me' element={<MyApplication/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/job/:id' element={<JobDetails/>}/>
        <Route path='/job/getall' element={<Jobs/>}/>
        <Route path='/job/me' element={<MyJobs/>}/>
        <Route path='/job/post' element={<PostJob/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>   
      <Footer/>
      <Toaster/>   
    </BrowserRouter>          
  )
}

export default App