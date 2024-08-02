import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../index';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiCall from '../../http/HttpApp';
import ResumeModal from './ResumeModal';

const MyApplication = () => {
  const { isAuthorized, user } = useContext(context);
  const [application, setApplication] = useState([]);
  const [modalOpen, setOpenModel] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.user && user.user.role === 'Employer') {
          const response = await apiCall('api/v1/application/get-employeeApp');
          setApplication(response.job);
          console.log(response.job, 'employee');
        } else {
          const response = await apiCall('api/v1/application/get-jobseekerApp');
          setApplication(response.job);
          console.log(response.job, 'job seeker');
        }
      } catch (error) {
        toast.error(error.job.response.message);
      }
    };
    
    if (!isAuthorized) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [isAuthorized, user]);

  const deleteApplication = async (id) => {
    try {
      const response = await apiCall(`api/v1/application/delete-jobseekerApp/${id}`);
      toast.success(response.job.message);
      setApplication(prevApplication => prevApplication.filter(application => application._id !== id));
    } catch (error) {
      toast.error(error.response.job.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeUrl(imageUrl);
    setOpenModel(true);      
  };

  const closeModal = () => {
    setOpenModel(false);
  }; 

  return (
    <section className='my_applications page'>
      {user && user.user && user.user.role === 'Job Seeker' ? (
        <div className='container'>
          <h1>My Applications</h1>
          {application.length <= 0 ? (
            <>
              {' '}
              <h4>No Applications Found</h4>
              {' '}
            </>
          ) : (
            application.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className='container'>
          <h1>Applications From Job Seekers</h1>
          {application.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            application.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplication;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className='job_seeker_card'>
    <div className='detail'>
      <p>
        <span>Name:</span> {element.name}
      </p>
      <p>
        <span>Email:</span> {element.email}
      </p>
      <p>
        <span>Phone:</span> {element.phone}
      </p>
      <p>
        <span>Address:</span> {element.address}
      </p>
      <p>
        <span>CoverLetter:</span> {element.coverLetter}
      </p>
    </div>
    <div className="resume">
      <img
        src={element.resume}
        alt="resume"
        onClick={() => openModal(element.resume)}
      />
    </div>
    <div className="btn_area">
      <button onClick={() => deleteApplication(element._id)}>
        Delete Application
      </button>
    </div>
  </div>
);   

const EmployerCard = ({ element, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p>
        <span>Name:</span> {element.name}
      </p>
      <p>
        <span>Email:</span> {element.email}
      </p>
      <p>
        <span>Phone:</span> {element.phone}
      </p>
      <p>
        <span>Address:</span> {element.address}
      </p>
      <p>
        <span>CoverLetter:</span> {element.coverLetter}
      </p>
    </div>
    <div className="resume">
      <img
        src={element.resume}
        alt="resume"
        onClick={() => openModal(element.resume)}
      />
    </div>
  </div>
);


