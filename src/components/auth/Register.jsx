import React, { useContext, useState } from 'react';
import {context} from "../../index";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'; 
import {FaRegUser} from "react-icons/fa";
import {FaPencilAlt} from "react-icons/fa";
import {MdOutlineMailOutline} from "react-icons/md";
import {FaPhoneFlip} from "react-icons/fa6"
import {RiLock2Fill} from "react-icons/ri";
import registerImg from "../../assets/images/register.png";
import apiCall from '../../http/HttpApp';

const Register = () => {
  const navigate= useNavigate()
 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [phone,setPhone] = useState("");
 const [password,setPassword] = useState("");
 const [role,setRole] = useState("");

 const {isAuthorized,setIsAuthorized,user,setUser} = useContext(context);

  const handleRegister = async(e) =>
  {
         e.preventDefault();
         try {
          if (!name.trim()) {
            toast.error("Please enter your name");
            return;
          }
          if (!email.trim()) {
            toast.error("Please enter your email");
            return;
          }
          if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
          }
          if (!phone.trim()) {
            toast.error("Please enter your phone number");
            return;
          }
          if (!/^\d{10}$/.test(phone)) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
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
    
               const data = await apiCall("api/v1/user/create-user",
               {
                name,
                email,
                phone,
                password,
                role
               });
               toast.success(data.message);
               setName("");
               setEmail("");
               setPhone("");
               setPassword("");
               setRole("");
               setIsAuthorized(true);
             if(data?.code === 200){
             navigate("/login")
             }
         } catch (error) {
              toast.error(error.response.data.message);
              console.log(error);
         }
  };
 
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h2>Create a new user</h2>
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
            <label>Name</label>
            <div>
              <input type="text" 
              placeholder='Name'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              />
              <FaPencilAlt/>
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
            <label>Phone Number</label>
            <div>
              <input type="number" 
              placeholder='123456'
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              />
              <FaPhoneFlip/>
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
            <button type='submit' onClick={handleRegister}>Register</button>
           <Link to={"/login"}>Login Now</Link>
            </form>
        </div>
        <div className="banner">
          <img src={registerImg} alt="login" />
        </div>
      </section>
    </>
  )
}

export default Register





