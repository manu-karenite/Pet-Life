import React from "react";
import RegisterForm from "../../Components/Hotels/Forms/RegisterConfirm.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const RegisterConfirm = () => {
  const navigate = useNavigate();
  const { hotel } = useSelector((state) => ({ ...state }));
  React.useEffect(() => {
    console.log(hotel);
    hotel && navigate("/hotel/dashboard");
  }, [hotel]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
