import React from "react";

// STYLING
import "../styles/contact.css";

const Contact = () => {
  return (
    <div className="container contactMain">
      <h1 className="text-center">Contact Form</h1>
      <form id="contact_form" className="contactForm" name="contact_form" method="post" style={{margin: "50px auto"}}>
        <div class="row flex-column flex-sm-row gap-3 contactFormInner">
          <div class="col">
            <label>First Name</label>
            <input
              type="text"
              required
              maxlength="50"
              class="form-control"
              id="first_name"
              name="first name"
            />
          </div>
          <div class="col">
            <label>Last Name</label>
            <input
              type="text"
              required
              maxlength="50"
              class="form-control"
              id="last_name"
              name="last name"
            />
          </div>
        </div>
        <div class="row flex-column flex-sm-row gap-3 contactFormInner">
          <div class="col">
            <label for="email_addr">Email address</label>
            <input
              type="email"
              required
              maxlength="50"
              class="form-control"
              id="email_addr"
              name="email"
              placeholder="email"
            />
          </div>
          <div class="col">
            <label for="phone_input">Phone</label>
            <input
              type="tel"
              required
              maxlength="50"
              class="form-control"
              id="phone_input"
              name="Phone"
              placeholder="Phone"
            />
          </div>
        </div>
        <div class="mb-5">
          <label for="message">Message</label>
          <textarea
            class="form-control"
            id="message"
            name="message"
            rows="5"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary px-4 btn-lg">
          Post
        </button>
      </form>
    </div>
  );
};

export default Contact;
