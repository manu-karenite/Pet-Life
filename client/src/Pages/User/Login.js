import React from "react";
import LoginForm from "../../Components/User/Forms/LoginForm.js";
import styles from "./Login.module.css";
const UserLogin = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`col-md-12 ${styles.loginBg}`}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
