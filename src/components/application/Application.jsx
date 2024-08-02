import React, { useContext, useState } from 'react';
import { context } from "../../index";
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiCall from '../../http/HttpApp';

const Application = () => {
  const { isAuthorized, user } = useContext(context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");  
  const [resume, setResume] = useState(null);

  const resumeHandleChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
    console.log(resume);   
  }

  const clearResume = () => {
    setResume(null);
  }

  const { id } = useParams();

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;      
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!phone.trim()) {
      toast.error("Phone is required");
      return;
    }
    if (!address.trim()) {
      toast.error("Address is required");
      return;
    }
    if (!coverLetter.trim()) {
      toast.error("Cover Letter is required");
      return;
    }
    if (!resume) {
      toast.error("Resume file is required");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
    try {
      const data = await apiCall("api/v1/application/post-application", formData, "multipart");
      console.log(data);
      toast.success(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCoverLetter("");
      setResume("");
      if (data?.code === 200) { 
        navigate("/job/getall");
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  if (!isAuthorized || (user && user.user && user.user.role === "Employer")) {
    navigate("/");
  }

  return (
    <section className='application'>
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleFileChange}>
          <input type="text"
            value={name}
            placeholder='Your Name'
            onChange={(e) => setName(e.target.value)}
          />
          <input type="text"
            value={email}
            placeholder='Your Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="number"
            value={phone}
            placeholder='Your Number'
            onChange={(e) => setPhone(e.target.value)}
          />
          <input type="text"
            value={address}
            placeholder='Your Address'
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            placeholder='CoverLetter....'
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label style={{ textAlign: "start", display: "block", fontSize: "20px" }}>
              Select Resume
            </label>
            <input type="file"
              accept='.pdf, .jpg, .png'
              onChange={resumeHandleChange}
              style={{ width: "100%" }}
            />
            {resume && (
              <button type="button" onClick={clearResume}>Clear Resume</button>
            )}
          </div>
          <button type='submit'>Send Application</button>
        </form>
      </div>
    </section>
  )
}

export default Application;