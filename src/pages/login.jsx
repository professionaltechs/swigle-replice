import React from "react";
import '../styles/login.css'

const Login = () => {
  return (
    <>
      <div className="LoginSection">
      <div className="form-container">
      <form className="form">
        <div className="form-group">
          <label for="email">Email</label>
          <input required="" name="email" id="email" type="text" />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input required="" name="password" id="email" type="password" />
          
        </div>
        <button type="submit" className="form-submit-btn">Login</button>
      </form>
    </div>
      </div>
    </>
  );
};

export default Login;
