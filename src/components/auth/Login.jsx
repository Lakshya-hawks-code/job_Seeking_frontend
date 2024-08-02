import React, { useContext, useState } from 'react';
import {context} from "../../index";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; 
import {FaRegUser} from "react-icons/fa";
import {MdOutlineMailOutline} from "react-icons/md";
import {RiLock2Fill} from "react-icons/ri";
import loginImg from "../../assets/images/login.png";
import apiCall from '../../http/HttpApp'; 

const Register = () => {
  const navigate= useNavigate()
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const [role,setRole] = useState("");

 const {isAuthorized,setIsAuthorized} = useContext(context);

  const handleLogin = async(e) =>
  {
    e.preventDefault();
    try {
      if(!email.trim())
      {
        toast.error("Please enter your email");
        return;
      }
      if(!/\S+@\S+\.\S+/.test(email))
      {
        toast.error("Please enter a valid email address");
        return
      }
      if (!password.trim()) {
        toast.error("Please enter your password");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      if (!role.trim()) {
        toast.error("Please select your role");
        return;
      }
      if (role !== "Employer" && role !== "Job Seeker") {
        toast.error("Invalid role selected");
        return;
      }
          const data = await apiCall("api/v1/user/login-user",
          {
           email,
           password,
           role
          });
          localStorage.setItem("email", email);
          localStorage.setItem("token",data.data.access_token)
          toast.success(data?.message);
          console.log(data.data.access_token)
          setEmail("");
          setPassword("");
          setRole("");
          setIsAuthorized(true);
        navigate("/otp-varification")
        
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
  
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h2>Login User</h2>
          </div>
            <form>
            <div className="inputTag">
            <label>User role</label>
            <div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Employer">Employer</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>
          <FaRegUser/>
            </div>
          </div>

          <div className="inputTag">
            <label>Email address</label>
            <div>
              <input type="email" 
              placeholder='lakshya123@gmail.com'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
              <MdOutlineMailOutline/>
            </div>
          </div>

          <div className="inputTag">
            <label>Passwors</label>
            <div>
              <input type="password" 
              placeholder='Your Password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              <RiLock2Fill/>
            </div>
          </div>
            <button type='submit' onClick={handleLogin}>Login</button>
            <Link style={{border:"none",marginTop:"-27px",fontSize:"15px", marginLeft:"197px"}} to={"/forgot-password"}>Forgot Password</Link>
           <Link style={{marginTop:"-16px"}} to={"/register"}>Register Now</Link>
            </form>
        </div>
        <div className="banner">
          <img src={loginImg} alt="login" />
        </div>
      </section>
    </>
  )
}

export default Register




