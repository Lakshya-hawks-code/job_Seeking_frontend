import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiCall from '../../http/HttpApp';
import toast from 'react-hot-toast';
import {context } from "../../index"

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const {setIsAuthorized} = useContext(context);

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    try {
      if (!otp.trim()) {
        toast.error("Please enter the OTP");
        return;
      }

      const data = await apiCall("api/v1/user/otp-Varification", {
        email,
        otp
      });

      if (data && data.code === 200) {
        toast.success(data.message);
        setIsAuthorized(true);
        navigate("/");
      } else {
        toast.error("Invalid OTP. Please enter a valid OTP.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };


  const handleResendOTP = async () => {
    const email = localStorage.getItem("email");

    try {
      const data = await apiCall("api/v1/user/resend-otp", {
        email
      });

      toast.success(data.message);
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
            <h2>OTP Verification</h2>
          </div>
          <form>
            <div className="inputTag" style={{marginLeft:"371px"}}>
              <label>OTP</label>
              <div>
                <input type="text" placeholder='Enter OTP'
                  value={otp} onChange={(e) => setOTP(e.target.value)} style={{width:"50%", height:"41px"}}/>
              </div>
            </div>
            <button type='submit' onClick={handleOTPVerification} style={{width:"34%", marginLeft:"363px"}}>Verify OTP</button>
            <button type='button' onClick={handleResendOTP} style={{ width: "34%", marginLeft: "363px" }}>Resend OTP</button>
            <Link to={"/login"} style={{width:"34%", marginLeft:"363px"}}>Back to Login</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Otp;

