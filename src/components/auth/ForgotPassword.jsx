import React, { useState,useContext } from 'react';
import { Link} from 'react-router-dom';
import apiCall from '../../http/HttpApp';
import toast from 'react-hot-toast';
import {context } from "../../index"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const {setIsAuthorized} = useContext(context);

  const handleForgotPassword = async () => {
    try {
      if (!email.trim()) {
        toast.error("Please enter the Email");
        return;
      }

      const data = await apiCall("api/v1/user/forgot-password", {
        email
      });
      console.log(data?.authToken)

      if (data && data.code === 200) {
        toast.success(data.message,{duration:5000});  // duration used to set time in a show message
        setEmail("")
        setIsAuthorized(true);
      } else {
        toast.error("Failed to initiate password reset process. Please try again later.");
      }
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
            <h2>Forgot Password</h2>
          </div>
          <form>
            <div className="inputTag" style={{marginLeft:"371px"}}>
              <div>
                <input type="text" placeholder='Email Address'
                  value={email} onChange={(e) => setEmail(e.target.value)} style={{width:"50%", height:"41px"}}/>
              </div>
            </div>
            <button type='button' onClick={handleForgotPassword} style={{ width: "34%", marginLeft: "363px" }}>Submit</button>
            <Link to={"/login"} style={{width:"15%", marginLeft:"363px", border:"none", marginTop:"-19px"}}>Back to Login</Link>
          </form>
        </div>
      </section>
    </>
  );
};


export default ForgotPassword;

