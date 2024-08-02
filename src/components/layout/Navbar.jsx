import React, { useContext, useState } from 'react';
import {context} from "../../index";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import jobZeelogos from "../../assets/images/JobZee-logos__white.png";
import { Link } from 'react-router-dom';
import {GiHamburgerMenu} from "react-icons/gi";
import apiCall from '../../http/HttpApp';

const Navbar = () => {
  const [show,setShow] = useState(false);
  const{isAuthorized,setIsAuthorized,user} = useContext(context);
  console.log(user,"fefejf")
  const navigate = useNavigate()

  const handleLogout = async() =>
  {
   try {
  
    const data = await apiCall("api/v1/user/logout-user");
    toast.success(data.message);
    setIsAuthorized(false);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
   } catch (error) {
    console.log(error)   
      toast.error(error.data.message);
      setIsAuthorized(true)
   }
  }
    console.log(user, "useruser")
  return (
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
         <div className="logo">
          <img src={jobZeelogos} alt="" />
         </div>
         <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
             <Link to={"/"} onClick={()=>setShow(false)}>Home</Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={()=>setShow(false)}>ALL JOBS</Link>
          </li>
          <li>
            <Link to={"/application/me"} onClick={()=>setShow(false)}>
              {
                user && user.user && user.user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"
              }
            </Link>
          </li> 
          {
            user && user.user && user.user.role === "Employer" ?   (
              <>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            ) :
            (
            <></>
          )}
          <button onClick={handleLogout}>LOGOUT</button>
         </ul>
         <div className="hamburger">
          <GiHamburgerMenu onClick={() =>setShow(!show)}/>
         </div>
        </div>
      </nav>
  )}

export default Navbar