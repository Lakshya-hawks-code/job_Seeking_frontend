import React, { useContext, useEffect, useState } from 'react';
import {context} from "../../index";
import { Link, useNavigate,useParams } from 'react-router-dom';
import apiCall from '../../http/HttpApp';


const JobDetails = () => {
    const {id} = useParams();
    const {isAuthorized,user} = useContext(context);
    const [job,setJobs] = useState({});
    const navigate = useNavigate();
    useEffect(()=>
    {
        const getSingleJob = async()=>
        {
        try {
            const response = await apiCall(`api/v1/job/getSingle-job/${id}`)
            setJobs(response.jobs);
            console.log(response,"jobs");
        } catch (error) {
            navigate("/notfound")
        }
    }
    getSingleJob();
    },[]);
    if(!isAuthorized)
    {
        navigate("/login");
    }
  return (
   <section className="jobDetail page">
    <div className="container">
    <h3>Job Details</h3>
      <div className="banner">
      <p>
        Title : <span>{job.title}</span>
      </p>
      <p>
      Description : <span>{job.description}</span>
      </p>
      <p>
      category : <span>{job.category}</span>
      </p>
      <p>
      country : <span>{job.country}</span>
      </p>
      <p>
      city : <span>{job.city}</span>
      </p>
      <p>
      location : <span>{job.location}</span>
      </p>
      <p>
        Salary : {" "} {job.fixedSalary ? (
        <span>
           {job.fixedSalary}
        </span>
        ) :
        (
        <span>
          {job.salaryForm} - {job.salaryTo}
        </span>
        )}
      </p>
      <p>
        Job Posted On : <span>{job.jobPostedOn}</span>
      </p>
           {
           user && user.user && user.user.role === "Employer" ? 
           (
           <></>
           ) : 
           (<Link to={`/application/${job._id}`}>Apply Now</Link>)
           } 
      </div>
    </div>
   </section>
  )
}
export default JobDetails