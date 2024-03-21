import React from 'react'
import "../styles/signup.css";

const Signup = () => {
  return (
    <form className="form">
    <p className="title">Register </p>
    <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
        <label>
            <input className="input UsersName" type="text" placeholder="" required="" />
            <span>Firstname</span>
        </label>

        <label>
            <input className="input UsersName" type="text" placeholder="" required=""   />
            <span>Lastname</span>
        </label>
    </div>  
            
    <label>
        <input className="input" type="email" placeholder="" required=""/>
        <span>Username</span>
    </label> 
    <label>
        <input className="input" type="email" placeholder="" required=""/>
        <span>Email</span>
    </label> 
    <label>
        <input className="input" type="text" placeholder="" required=""/>
        <span>Phone</span>
    </label> 
    <label>
        <input className="input" type="text" placeholder="" required=""/>
        <span>Address</span>
    </label> 
    <div className="flex-box">
        <label>
            <input className="input locationLabel" type="text" placeholder="" required="" />
            <span>City:</span>
        </label>

        <label>
            <input className="input locationLabel" type="text" placeholder="" required="" />
            <span>State:</span>
        </label>
        <label>
            <input className="input locationLabel" type="text" placeholder="" required="" />
            <span>Postal Code:</span>
        </label>
    </div> 
    <label>
        <input className="input" type="text" placeholder="" required=""/>
        <span>Country</span>
    </label> 
    <button className="submit">Sign Up</button>
    <p className="signin">Already have an acount ? <a href="#">Login</a> </p>
</form>
  )
}

export default Signup