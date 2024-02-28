import React from 'react'

// ICONS
import { IoMenuOutline } from "react-icons/io5";

// STYLING
import '../styles/navbar.css'

const Navbar = () => {
    return (
        <div className='navbarMain'>
            <h2>Logo</h2>
            <IoMenuOutline className='menuIcon' />
            <ul className='navLinks'>
                <li className='navLink'>Home</li>
                <li className='navLink'>Features</li>
                <li className='navLink'>Pricing</li>
                <li className='navLink'>Blog</li>
                <li className='navLink'>FAQ</li>
                <li className='navLink'>Contact Us</li>
            </ul>
        </div>
    )
}

export default Navbar
