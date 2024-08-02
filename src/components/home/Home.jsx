import React from 'react';
import {context} from "../../index";
import { useContext } from 'react';
import HeroSection from "./HeroSection.jsx"
import HowItWorks from './HowItWorks.jsx';
import PopularCatagries from "./PopularCatagries.jsx";
import PopularCompanies from "./PopularCompanies.jsx";
import { Navigate } from 'react-router-dom';

const Home = () => {
  const {isAuthorized} = useContext(context);
  console.log(isAuthorized,"jjjf")
  if(!isAuthorized)
  {
    return <Navigate to={"/login"}/>
  }
  return (
    <section className="homePage page">
      <HeroSection/>
      <HowItWorks/>
      <PopularCatagries/>
      <PopularCompanies/>
    </section>
  )
}

export default Home