import React from 'react'
import Application from './Application'

const ResumeModal = ({imageUrl,onClose}) => {
  return (
   <div styleName='resume-modal'>
    <div className="modal-content">
      <span className='close' onClick={onClose}>
      &times;
      </span>
      <img src={imageUrl} alt="resume" />
    </div>
   </div>
  )
}

export default ResumeModal


  