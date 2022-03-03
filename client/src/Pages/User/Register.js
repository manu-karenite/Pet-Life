import React from "react";
import RegisterForm from "../../Components/User/Forms/RegisterForm.js";
const RegisterUser = () => {
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-3" />
        <div className="col-md-6" style={{ marginBottom: "20px" }}>
          <RegisterForm />
        </div>
        <div className="col-md-3" />
      </div>
    </div>
  );
};

export default RegisterUser;