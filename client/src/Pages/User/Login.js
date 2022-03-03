import React from "react";
import LoginForm from "../../Components/User/Forms/LoginForm.js";
const UserLogin = () => {
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

export default UserLogin;
