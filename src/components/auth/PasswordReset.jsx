import React, { useState,useContext } from 'react';
import { Link} from 'react-router-dom';
import apiCall from '../../http/HttpApp';
import toast from 'react-hot-toast';
import { context } from '../../index';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {setIsAuthorized} = useContext(context);

  const handleResetPassword = async () => {
    try {
      if (!password.trim() || !confirmPassword.trim()) {
        toast.error("Please enter both password fields");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const data = await apiCall("api/v1/user/reset-password", {
        password
      });

      if (data && data.code === 200) {
        toast.success(data.message, { duration: 5000 });
        setPassword("");
        setConfirmPassword("");
        setIsAuthorized(true);
      } else {
        toast.error("Failed to reset password. Please try again later.");
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
            <h2>Reset Password</h2>
          </div>
          <form>
            <div className="inputTag" style={{ marginLeft: "371px" }}>
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "50%", height: "41px" }}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ width: "50%", height: "41px", marginTop: "10px" }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetPassword}
              style={{ width: "34%", marginLeft: "363px" }}
            >
              Reset Password
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;