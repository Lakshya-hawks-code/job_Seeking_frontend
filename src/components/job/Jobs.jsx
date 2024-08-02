import React,{useState,useContext} from 'react';
import {context} from "../../index";
import { useNavigate,Link } from 'react-router-dom';
import { useEffect } from 'react';
import apiCall from "../../http/HttpApp";
import toast from 'react-hot-toast';

const Jobs = () => {
  const [job,setJobs] = useState([]);
  const {isAuthorized} = useContext(context);
  const navigate = useNavigate();  

  useEffect(()=>
  {
    const getAllJobs = async() =>
      {
        try {
          const response = await apiCall("api/v1/job/getAll-jobs");
          setJobs(response.jobs)
          console.log(response.jobs,"kkfkerf")

        } catch (error) {
          console.log(error);
        }
      };
      getAllJobs();
  },[]);
  if(!isAuthorized)
  {
    navigate("/")
  }
 
    
  return (
   <section className='jobs page'>
    <div className="container">
    <h1>ALL AVAILABLE JOBS</h1>
      <div className="banner">
        {
        job && job.map((element)=>
          {
            return ( 
            <div>
               <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
               </div>
            </div>
            )
          })
        }
      </div>
    </div>
   </section>
  )
}

export default Jobs