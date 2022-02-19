import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../Components/Hotels/Forms/RegisterForm.js";
const RegisterHotel = () => {
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-3" />
        <div className="col-md-6" style={{ marginBottom: "20px" }}>
          <RegisterForm />
          <div style={{ textAlign: "center" }} className="mt-3">
            Already Our Partner? <Link to="/hotel/login">Login Now!</Link>
          </div>
        </div>
        <div className="col-md-3" />
      </div>
    </div>
  );
};

export default RegisterHotel;
