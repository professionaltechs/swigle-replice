import React from "react";

// STYLING
import "../styles/contact.css";

const Contact = () => {
  return (
    <div className="container contactMain">
      <h1 className="text-center">Contact Form</h1>
      <form id="contact_form" className="contactForm" name="contact_form" method="post" style={{margin: "50px auto"}}>
        <div className="row flex-column flex-sm-row gap-3 contactFormInner">
          <div className="col">
            <label>First Name</label>
            <input
              type="text"
              required
              className="form-control"
              id="first_name"
              name="first name"
            />
          </div>
          <div className="col">
            <label>Last Name</label>
            <input
              type="text"
              required
              className="form-control"
              id="last_name"
              name="last name"
            />
          </div>
        </div>
        <div className="row flex-column flex-sm-row gap-3 contactFormInner">
          <div className="col">
            <label>Email address</label>
            <input
              type="email"
              required
              className="form-control"
              id="email_addr"
              name="email"
            />
          </div>
          <div className="col">
            <label>Phone</label>
            <input
              type="tel"
              required
              className="form-control"
              id="phone_input"
              name="Phone"
            />
          </div>
        </div>
        <div className="mb-5">
          <label>Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="5"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary px-4 btn-lg">
          Post
        </button>
      </form>
    </div>
  );
};

export default Contact;
