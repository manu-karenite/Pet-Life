import React from "react";
import RegisterForm from "../../Components/Hotels/Forms/RegisterConfirm.js";
import { Link } from "react-router-dom";
const RegisterConfirm = () => {
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-3" />
        <div className="col-md-6" style={{ marginBottom: "20px" }}>
          <RegisterForm />
          <div style={{ textAlign: "center" }} className="mt-3">
            Want to Become our Partner?{" "}
            <Link to="/hotel/register">Register Now</Link>
          </div>
        </div>
        <div className="col-md-3" />
      </div>
    </div>
  );
};

export default RegisterConfirm;
