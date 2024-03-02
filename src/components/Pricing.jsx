import React, { useState } from "react";
import { duration } from "../components/paymentPackagesList";

// STYLING
import "../styles/pricing.css";

const Pricing = () => {
  const [pricingDuration, setPricingDuration] = useState(duration[0]);

  return (
    <section className="pricing py-5">
      <h1 className="text-center pricingHeading">Pricing</h1>
      <div className="container PricingDetailsMain">
        <div className="d-flex justify-content-center align-items-center gap-4">
          <p
            className={`${
              pricingDuration == duration[0] ? "bg-dark text-light rounded" : ""
            }  p-2 duartionButton`}
            onClick={() => setPricingDuration(duration[0])}
          >
            Monthly
          </p>
          <p
            className={`${
              pricingDuration == duration[1] ? "bg-dark text-light rounded" : ""
            } p-2 duartionButton`}
            onClick={() => setPricingDuration(duration[1])}
          >
            Yearly
          </p>
          <p
            className={`${
              pricingDuration == duration[2] ? "bg-dark text-light rounded" : ""
            } p-2 duartionButton`}
            onClick={() => setPricingDuration(duration[2])}
          >
            Lifetime
          </p>
        </div>
        <div className="row PricingDetailsInner">
          <div className="col-xl-3 col-md-6 mb-5">
            <div className="card mb-5 mb-lg-0" style={{height: '100%'}}>
              <div className="card-body">
                <h5 className="card-title  text-uppercase text-center">
                  Free
                </h5>
                <h6 className="card-price text-center">
                  $0<span className="period">/month</span>
                </h6>
                <hr />
                <ul className="fa-ul">
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    1.00 GB Storage Space
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    100.00 MB Size per transfer
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Files available for 1 day
                  </li>
                  <li className="">
                    <span className="fa-li">
                      <i className="fas fa-times"></i>
                    </span>
                    Password protection
                  </li>
                  <li className="">
                    <span className="fa-li">
                      <i className="fas fa-times"></i>
                    </span>
                    Email notification
                  </li>
                  <li className="">
                    <span className="fa-li">
                      <i className="fas fa-times"></i>
                    </span>
                    Expiry time control
                  </li>
                  <li className="">
                    <span className="fa-li">
                      <i className="fas fa-times"></i>
                    </span>
                    Generate transfer links
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-5">
            <div className="card mb-5 mb-lg-0" style={{height: '100%'}}>
              <div className="card-body">
                <h5 className="card-title  text-uppercase text-center">
                  Plus
                </h5>
                <h6 className="card-price text-center">
                  $9<span className="period">/month</span>
                </h6>
                <hr />
                <ul className="fa-ul">
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    10.00 GB Storage Space
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    1.00 GB Size per transfer
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Files available for 7 days
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Password protection
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Email notification
                  </li>
                </ul>
                <div className="d-grid">
                  <a href="#" className="btn btn-primary text-uppercase">
                    Choose Plan
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-5">
            <div className="card" style={{height: '100%'}}>
              <div className="card-body">
                <h5 className="card-title  text-uppercase text-center">
                  Pro
                </h5>
                <h6 className="card-price text-center">
                  $49<span className="period">/month</span>
                </h6>
                <hr />
                <ul className="fa-ul">
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    50.00 GB Storage Space
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    10.00 GB Size per transfer
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Files available for 30 days
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Password protection
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Email notification
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Expiry time control
                  </li>
                </ul>
                <div className="d-grid">
                  <a href="#" className="btn btn-primary text-uppercase">
                    Choose plan
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-5">
            <div className="card" style={{height: '100%'}}>
              <div className="card-body">
                <h5 className="card-title  text-uppercase text-center">
                  Premium
                </h5>
                <h6 className="card-price text-center">
                  $99<span className="period">/month</span>
                </h6>
                <hr />
                <ul className="fa-ul">
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Unlimited Storage Space
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Unlimited Size per transfer
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Files available for Unlimited time
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Password protection
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Email notification
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Expiry time control
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    Generate transfer links
                  </li>
                  <li>
                    <span className="fa-li">
                      <i className="fas fa-check"></i>
                    </span>
                    No Advertisements
                  </li>
                </ul>
                <div className="d-grid">
                  <a href="#" className="btn btn-primary text-uppercase">
                    Choose plan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
