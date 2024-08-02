import React from 'react'
import { Link } from 'react-router-dom';
import notFound from "../../assets/images/notfound.png";

const NotFound = () => {
  return (
  <>
     <section className='page notfound'>
          <div className="content">
            <img src={notFound} alt="notfound" />
            <Link to={'/'}>RETURN TO HOME PAGE</Link>
          </div>
        </section>
  </>
  )
}

export default NotFound