import React from "react";

// COMPONENTS
import Navbar from "../components/Layout/Navbar";
import Upload from "../components/Upload";
import Features from "../components/Features";
import Attributes from "../components/Attributes";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";

// STYLES
import "../styles/home.css";

const Home = () => {
  return (
    <>
      <div className="homeTop">
        <Navbar />
        <Upload />
      </div>
      {/* <Features /> */}
      <Attributes/>
      <Pricing />
      <Contact />
    </>
  );
};

export default Home;  
