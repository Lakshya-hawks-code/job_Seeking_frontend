import React, { useEffect, useState } from 'react';
import {context} from "../../index";
import apiCall from '../../http/HttpApp';
import { useContext } from 'react';
import {FaCheck} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import validatorJs from ""

const MyJobs = () => {
  const navigate = useNavigate();
  const [myJob,setMyJob] = useState([]);
  const [editingMode,setEditingMode] = useState(null);
  const {isAuthorized,user} = useContext(context);
    
  // get Jobs of Login User
  useEffect(()=>
  {
    const getMyJob = async() =>
    {
      try {
        const response = await apiCall("api/v1/job/get-myJobs");
        setMyJob(response.job)
        console.log(response);
      } catch (error) {
        toast.error(error.response.job.message);
        setMyJob([])
      }
    }
    getMyJob();
  },[]);


  if(!isAuthorized || (user && user.user && user.user.role !== "Employer"))
  {
      navigate("/");
  }

  // Enable Editing

   const handleEnableEditing = async(jobId) =>
   {
       setEditingMode(jobId);
   } 

  // Disable Editing

  const handleDisableEditing = async() =>
  {
    setEditingMode(null);
  }

  // Update Jobs

  const handleUpdateJobs = async(jobId) =>
  {
     try {
      const update = myJob.find((job) => job._id === jobId);
      const response = await apiCall(`api/v1/job/update-jobs/${jobId}`,update);
      toast.success(response.message);
      setEditingMode(null);
      console.log(response);
     } catch (error) {
      toast.error(error.response)
        console.log(error);
     }   
  }
    
  // Delete Jobs

  const handleDeleteJobs = async(jobId) =>
  {
    try {
      const response = await apiCall(`api/v1/job/delete-jobs/${jobId}`);
      toast.success(response.message)
      console.log(response);
      setMyJob((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.log(error);
    }
  }

  // Input Change Value and New Value

  const handleInputChange = async(jobId,field,value) =>
  {
      setMyJob((prevJob)=>
       prevJob.map((job)=>
       (
        job._id === jobId ? {...job,[field]:value} : job
       ))
      )
  }


  // Click a button to generate Excel File

  const generateExcelFile = async() =>
    {
      try {
           const data = await apiCall("api/v1/job/generate-excel")
           if(data.code === 200)
            {
              toast.success(data.message);
              navigate("/job/getall")
            }
      } catch (error) {
        console.log(error);
      }
    }

  return (
     <>
       <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Jobs</h1>
          {
            myJob.length > 0 ? 
             <>
        <div className="banner">
  {myJob.map((element) => (
    <div className="card" key={element._id}>
      <div className="content">
        <div className="short_fields">
          <div className="column">
            <div>
              <span>Title:</span>
              <input
                type="text"
                value={element.title}
                disabled={editingMode !== element.id ? true : false}
                onChange={(e) =>
                  handleInputChange(element._id, "title", e.target.value)
                }
              />
            </div>
            <div>
              <span>Country:</span>
              <input
                type="text"
                value={element.country}
                disabled={editingMode !== element.id ? true : false}
                onChange={(e) =>
                  handleInputChange(element._id, "country", e.target.value)
                }
              />
            </div>
          </div>
          <div className="column">
            <div>
              <span>City:</span>
              <input
                type="text"
                value={element.city}
                disabled={editingMode !== element._id ? true : false}
                onChange={(e) =>
                  handleInputChange(element._id, "city", e.target.value)
                }
              />
            </div>
            <div>
              <span>Category:</span>
              <select
                value={element.category}
                onChange={(e) =>
                  handleInputChange(element._id, "category", e.target.value)
                }
                disabled={editingMode !== element._id ? true : false}
              >
                <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
              </select>
            </div>
          </div>
        </div>
        <div className="long_field">
          <div>
            <span>Description:</span>{" "}
            <textarea
              rows="5"
              value={element.description}
              disabled={editingMode !== element._id ? true : false}
              onChange={(e) =>
                handleInputChange(element._id, "description", e.target.value)
              }
            />
          </div>
          <div>
            <span>Location: </span>
            <textarea
              rows="5"
              value={element.location}
              disabled={editingMode !== element._id ? true : false}
              onChange={(e) =>
                handleInputChange(element._id, "location", e.target.value)
              }
            />
          </div>
        </div>
        <div className="button_wrapper">
          <div className="edit_btn_wrapper">
            {editingMode === element._id ? (
              <>
                <button
                  onClick={() => handleUpdateJobs(element._id)}
                  className="check_btn"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleDisableEditing()}
                  className="cross_btn"
                >
                  <RxCross2 />
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEnableEditing(element._id)}
                className="edit_btn"
              >
                Edit
              </button>
            )}
          </div>
          <button
            onClick={() => handleDeleteJobs(element._id)}
            className="delete_btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
             </>
            : 
            (
               <p>You've not posted any job or may be you deleted all of your jobs!</p>  
            )
          }
              <button onClick={generateExcelFile} style={{fontSize:"20px"}} className='generate-excel-btn'>Save</button>
        </div>
       </div>
     </>
  )
}

export default MyJobs




