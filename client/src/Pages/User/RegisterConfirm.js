import React from "react";
import RegisterForm from "../../Components/User/Forms/RegisterConfirm.js";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./Login.module.css";
const RegisterConfirm = () => {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>PetLife | Confirm Registration</title>
      </Helmet>

      <div className="container-fluid">
        <div className="row">
          <div className={`col-md-12 ${styles.loginBg}`}>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterConfirm;
