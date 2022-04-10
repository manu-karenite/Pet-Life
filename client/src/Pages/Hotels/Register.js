import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../Components/Hotels/Forms/RegisterForm.js";
import { useSelector } from "react-redux";
const RegisterHotel = () => {
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
      <RegisterForm />
    </div>
  );
};

export default RegisterHotel;
