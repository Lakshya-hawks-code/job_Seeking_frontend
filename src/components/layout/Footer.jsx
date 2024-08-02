import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {context} from "../../index";
import {FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import {RiInstagramFill} from "react-icons/ri";

const Footer = () => {
  const {isAuthorized} = useContext(context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>
        &copy; All Rights Reserved By CodeWithLakshya
      </div>
       <div>
       <Link to={"https://www.facebook.com/"} target='_blank'>
        <FaFacebookF/>
      </Link>
      <Link to={"https://www.youtube.com/"} target='_blank'>
        <FaYoutube/>
      </Link>
      <Link to={"https://www.linkedin.com/feed/"} target='_blank'>
        <FaLinkedin/>
      </Link>
      <Link to={"https://www.instagram.com/"} target='_blank'>
        <RiInstagramFill/>
      </Link>
       </div>
    </footer>
  )
}

export default Footer


