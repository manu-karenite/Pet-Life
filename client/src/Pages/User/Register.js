import React from "react";
import RegisterForm from "../../Components/User/Forms/RegisterForm.js";
import styles from "./Login.module.css";
const RegisterUser = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`col-md-12 ${styles.loginBg}`}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
