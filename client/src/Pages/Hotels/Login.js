import React from "react";
import LoginForm from "../../Components/Hotels/Forms/LoginForm.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HotelLogin = () => {
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
        <div className="col-md-2" />
        <div className="col-md-8" style={{ marginBottom: "20px" }}>
          <LoginForm />
        </div>
        <div className="col-md-2" />
      </div>
    </div>
  );
};

export default HotelLogin;
