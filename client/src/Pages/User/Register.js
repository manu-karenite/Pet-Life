import React from "react";
import RegisterForm from "../../Components/User/Forms/RegisterForm.js";
import styles from "./Login.module.css";
import { Helmet } from "react-helmet";
const RegisterUser = () => {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {" "}
      <Helmet>
        <title>PetLife | Register</title>
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

export default RegisterUser;
