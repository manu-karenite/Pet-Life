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
    <div
      className="container-fluid"
      style={{ backgroundColor: "rgb(30, 30, 40) !important" }}
    >
      <div className="row">
        <LoginForm />
      </div>
    </div>
  );
};

export default HotelLogin;
