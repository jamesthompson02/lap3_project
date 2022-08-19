import React from 'react';
import image from "./../../Images/homepage-pic-lap-3-project-removebg-preview.png";
import './style.css';
//

const Home = () => {

  const styling = {
    minHeight: "calc(100vh - 100px)",
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    objectFit: "cover",
    backgroundPosition: "right",
    padding: "1rem",
  }
  return (
    <div style={styling}>
      <h1 style={{marginTop: "2rem"}}>Welcome to Triviaholic!</h1>

      <p style={{marginTop: "2rem", fontSize: "1.5rem"}}>Compete against your friends!</p>

      <p style={{marginTop: "1rem", fontSize: "1.5rem"}}>Thousands of questions to answer!</p>

      <a href="/quiz" style={{marginLeft: "7rem"}}><button className='btnStyle'>Take a quiz!</button></a>


      
      
    </div>
  );
};

export default Home;
