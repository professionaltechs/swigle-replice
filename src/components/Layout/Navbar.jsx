import React, { useEffect, useState } from "react";

// ICONS
import { IoMenuOutline } from "react-icons/io5";

// STYLING
import "../../styles/navbar.css";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const navbar = document.getElementsByClassName("navbarMain")[0];
    const handleScroll = () => {
      if (window.scrollY > 10) {
        navbar.style.backgroundColor = " rgba(255, 255, 255, 0.2)";
        navbar.style.backdropFilter = " blur(8px)";
        navbar.style.color = " black";
      } else {
        navbar.style.backgroundColor = "";
        navbar.style.backdropFilter = "";
        navbar.style.color = "";
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const navbar = document.getElementsByClassName("navbarMain")[0];
    const handleResize = () => {
      if (window.innerWidth < 768) {
        let navbarHeight = navbar.offsetHeight;
        sidebar.style.display = "block";
        sidebar.style.top = navbarHeight + "px";
        sidebar.style.height = window.innerHeight - navbarHeight + "px";
      } else {
        setSidebarOpen(false);
        document.querySelector(".sidebar").style.display = "none";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (sidebarOpen) {
      body.style.touchAction = "none";
    } else {
      body.style.touchAction = "auto";
    }
  }, [sidebarOpen]);

  return (
    <>
      <div className={`navbarMain ${sidebarOpen ? "navbarActive" : ""}`}>
        <h2>Logo</h2>
        <IoMenuOutline
          className={`menuIcon`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <ul className="navLinks">
          <li className="navLink">Home</li>
          <li className="navLink">Features</li>
          <li className="navLink">Pricing</li>
          <li className="contactUsLink">Contact Us</li>
        </ul>
      </div>
      <div className={`sidebar  ${sidebarOpen ? "sidebarActive" : ""}`}>
        <div className="sidebarInner">
          <ul className="navLinksMobile">
            <li className="navLinkMobile">Home</li>
            <li className="navLinkMobile">Features</li>
            <li className="navLinkMobile">Pricing</li>
            <li className="contactUsLinkMobile">Contact Us</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
