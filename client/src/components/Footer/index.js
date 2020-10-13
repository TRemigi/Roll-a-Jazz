import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <footer className="container mt-5">
      <div className="row justify-content-center">
        <Link to="/contact">Contact Us</Link>
        <div className="col-12 text-center text-align-center">
          &copy;2020 by AlgoRhythmic Development
        </div>
      </div>
    </footer>
  );
};

export default Footer;
