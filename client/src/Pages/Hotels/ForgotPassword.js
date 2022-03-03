import React from "react";
import styles from "../../Styles/ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  forgotPassword,
  verifyOTP,
  updatePassword,
} from "../../Axios/Hotel/Authentication.js";
import { toast } from "react-toastify";
import { Steps } from "antd";
const { Step } = Steps;
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [otpSent, setOtpSent] = React.useState("first");
  const [otp, setOtp] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmpass, setConfirmpass] = React.useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    forgotPassword(email)
      .then((res) => {
        toast(`OTP has been sent to ${email}`);
        setEmail(res.data);
        setOtpSent("second");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  const submitOTPHandler = (e) => {
    e.preventDefault();
    console.log(otp, email);
    verifyOTP(otp, email)
      .then((res) => {
        toast(`OTP Verified 🎉 Continue to Create Passwords`);
        setOtpSent("third");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  const submitFinishHandler = (e) => {
    e.preventDefault();
    console.log(pass, confirmpass, email);
    updatePassword(pass, confirmpass, email)
      .then((res) => {
        toast(`Password Succesfully Changed! Login to Continue`);
        navigate("/hotel/login");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row" style={{ padding: "0px !important" }}>
        <div className="col-md-12">
          <div className={styles.bg}>
            {otpSent === "first" && (
              <div className={styles.actualFP}>
                <center>
                  <div className={styles.FPImg}>
                    <img
                      src="https://i.ibb.co/rshckyB/car-key.png"
                      alt="car"
                      style={{ margin: "20px" }}
                    />

                    <div className={styles.FPLabel1}>Forgot Password?</div>
                    <div className={styles.FPLabel2}>
                      Reset Your Password Here
                    </div>
                  </div>
                  <form onSubmit={submitHandler}>
                    <center>
                      <input
                        type="email"
                        className={styles.FPInput}
                        placeholder="Business Mail Registered"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      <input
                        type="submit"
                        className={styles.FPSubmit}
                        value="Reset Password"
                      />
                    </center>
                  </form>
                  <div className={styles.FPLabel2}>
                    Want to Login? <Link to="/hotel/login">Login Here</Link>
                  </div>
                </center>
              </div>
            )}
            {otpSent === "second" && (
              <div className={styles.actualFP}>
                <center>
                  <div className={styles.FPImg}>
                    <img
                      src="https://i.ibb.co/rshckyB/car-key.png"
                      alt="car"
                      style={{ margin: "20px" }}
                    />
                    <div className={styles.FPLabel1}>Enter OTP</div>
                    <div className={styles.FPLabel2}>
                      We've sent an OTP, to {email}
                    </div>
                  </div>
                  <form onSubmit={submitOTPHandler}>
                    <center>
                      <input
                        type="number"
                        className={styles.FPInput}
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        minLength="6"
                        maxLength="6"
                        style={{
                          letterSpacing: "5px",
                          padding: "10px",
                        }}
                      />
                      <input
                        type="submit"
                        className={styles.FPSubmit}
                        value="Validate OTP"
                      />
                    </center>
                  </form>
                  {/* <div className={styles.FPLabel2}>
                    Want to Login? <Link to="/hotel/login">Login Here</Link>
                  </div> */}
                </center>
              </div>
            )}
            {otpSent === "third" && (
              <div className={styles.actualFP}>
                <center>
                  <div className={styles.FPImg}>
                    <img
                      src="https://i.ibb.co/rshckyB/car-key.png"
                      alt="car"
                      style={{ margin: "20px" }}
                    />
                    <div className={styles.FPLabel1}>Create Password</div>
                    <div className={styles.FPLabel2}>
                      User Verified ! Create Password
                    </div>
                  </div>
                  <form onSubmit={submitFinishHandler}>
                    <center>
                      <input
                        type="password"
                        className={styles.FPInput}
                        placeholder="Password"
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        style={{
                          letterSpacing: "5px",
                          padding: "10px",
                        }}
                      />
                      <input
                        type="password"
                        className={styles.FPInput}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmpass(e.target.value)}
                        value={confirmpass}
                        style={{
                          letterSpacing: "5px",
                          padding: "10px",
                        }}
                      />
                      <input
                        type="submit"
                        className={styles.FPSubmit}
                        value="Finish"
                      />
                    </center>
                  </form>
                  {/* <div className={styles.FPLabel2}>
                    Want to Login? <Link to="/hotel/login">Login Here</Link>
                  </div> */}
                </center>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
