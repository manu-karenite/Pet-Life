import React from "react";
import LoginForm from "../../Components/Hotels/Forms/LoginForm.js";
import { Link } from "react-router-dom";
const HotelLogin = () => {
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
