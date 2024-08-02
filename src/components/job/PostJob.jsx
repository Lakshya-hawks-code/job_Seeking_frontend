import React, { useContext, useState } from 'react';
import {context} from "../../index";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiCall from '../../http/HttpApp';

const PostJob = () => {
  const {isAuthorized,user} = useContext(context);
  const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [country,setCountry] = useState("");
  const [city,setCity] = useState("");
  const [location,setLocation] = useState("");
  const [fixedSalary,setFixedSalary] = useState("");
  const [salaryForm,setSalaryForm] = useState("");
  const [salaryTo,setSalaryTo] = useState("");
  const [salaryType,setSalaryType] = useState("default");

  const handlePostJob = async(e) =>
  {
    e.preventDefault();
    try {
      if(!title.trim())
      {
        toast.error("Title is required");
        return;
      }
      if (title.trim().length < 3) {
        toast.error("Title must be at least 3 characters long");
        return;
      }
      if(!category.trim())
        {
          toast.error("Category is required");
          return;
        }
        if(!country.trim())
          {
            toast.error("Country is required");
            return;
          }
          if(!city.trim())
            {
              toast.error("City is required");
              return;
            }
            if(!location.trim())
              {
                toast.error("Location is required");
                return;
              }
              if(location.trim().length < 10)
                {
                  toast.error("Location must be at least 10 characters long");
                  return;
                }
      if(!description.trim())
      {
        toast.error("Description is required");
        return;
      }
      if (salaryType === "Fixed Salary") {
        if (!fixedSalary.trim()) {
          toast.error("Fixed Salary is required");
          return;
        }
      } else if (salaryType === "Ranged Salary") {
        if (!salaryForm.trim()) {
          toast.error("Salary Form is required");
          return;
        }
        if (!salaryTo.trim()) {
          toast.error("Salary To is required");
          return;
        }
        if (parseFloat(salaryForm) >= parseFloat(salaryTo)) {
          toast.error("Salary From must be less than Salary To");
          return;
        }
      }
      
       const data = await apiCall("api/v1/job/post-jobs", {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary: salaryType === "Fixed Salary" ? fixedSalary : undefined,
        salaryForm: salaryType === "Ranged Salary" ? salaryForm : undefined,
        salaryTo: salaryType === "Ranged Salary" ? salaryTo : undefined
      });
        toast.success(data.message);
        console.log(data)
        setTitle("");
        setDescription("");
        setCategory("");
        setCountry("");
        setCity("");
        setLocation("");
        setFixedSalary("");
        setSalaryForm("");
        setSalaryTo("")
    } catch (error) {
      toast.error(error.data.message);
      console.log(error)
    }
    if(!isAuthorized || (user && user.user && user.user.role !== "Employer"))
    {
        navigate("/")
    }
  }
  return (
    <div className='job_post page'>
       <div className="container">
       <h3>POST NEW JOB</h3>  
       <form onSubmit={handlePostJob}>
         <div className="wrapper">
          <input type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Job Title'
          />
          <select value={category}
                  onChange={(e)=>setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Mern Stack Development">Mern Stack Development</option>
            <option value="Android Development">Android Development</option>
            <option value="Cloud Developer">Cloud Developer</option>
            <option value="Artifical Intelligence">Artifical Intelligence</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Machine Learning">Devops Engineer</option>
            <option value="React Developer">React Developer</option>
            <option value="Node Developer">Node Developer</option>
          </select>
         </div>
           <div className="wrapper">
            <input type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder='Country'
            />
            <input type="text"
                   value={city}
                   onChange={(e) => setCity(e.target.value)}
                   placeholder='City'
                />
           </div>
           <input type="text"
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                   placeholder='Location'
                />
               <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                 {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryForm}
                      onChange={(e) => setSalaryForm(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
            <button type='submit'>Create Job</button>
       </form>
       </div>
    </div>
  )
}

export default PostJob