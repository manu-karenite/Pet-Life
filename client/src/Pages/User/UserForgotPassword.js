import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  forgotPassword,
  verifyOTP,
  updatePassword,
} from "../../Axios/User/Authentication.js";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Steps } from "antd";
const { Step } = Steps;
const UserForgotPassword = () => {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
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
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <>
      <Helmet>
        <title>PetLife | Forgot Password</title>
      </Helmet>
      <div className="container-fluid">
        <div className="row" style={{ padding: "0px !important" }}>
          <div className="col-md-12">
            <div>
              {otpSent === "first" && (
                <center>
                  <div
                    style={{
                      backgroundColor: "",
                      padding: "25px",
                      margin: "40px 0px",
                      border: "2px solid #121916",
                      width: "50%",
                    }}
                  >
                    <center>
                      <h2>
                        <b>Forgot Password?</b>
                      </h2>
                      <h9>
                        <b>Reset Your Password Here</b>
                      </h9>
                      <form onSubmit={submitHandler}>
                        <center>
                          <input
                            type="email"
                            placeholder="Mail Registered"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            style={{
                              width: "60%",
                              border: "2px solid #121916",
                              textAlign: "center",
                              margin: "10px 0px",
                              borderTopLeftRadius: "10px",
                              borderBottomRightRadius: "10px",
                            }}
                          />
                          <br></br>
                          <input
                            type="submit"
                            value="Reset Password"
                            style={{
                              width: "30%",
                              backgroundColor: "#121916",
                              color: "white",
                              border: "1px solid #121916",
                              margin: "10px 0px",
                            }}
                          />
                        </center>
                      </form>
                      <div>
                        <b>
                          Want to Login? <Link to="/login">Login Here</Link>
                        </b>
                      </div>
                    </center>
                  </div>
                </center>
              )}

              {otpSent === "second" && (
                <center>
                  <div
                    style={{
                      backgroundColor: "",
                      padding: "25px",
                      margin: "40px 0px",
                      border: "2px solid #121916",
                      width: "50%",
                    }}
                  >
                    <center>
                      <h2>
                        <b>Enter OTP</b>
                      </h2>
                      <h9>
                        <b>We've sent an OTP to {email}</b>
                      </h9>
                      <form onSubmit={submitOTPHandler}>
                        <center>
                          <input
                            type="number"
                            style={{
                              width: "60%",
                              border: "2px solid #121916",
                              textAlign: "center",
                              margin: "10px 0px",
                              borderTopLeftRadius: "10px",
                              borderBottomRightRadius: "10px",
                            }}
                            placeholder="Enter OTP"
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                            minLength="6"
                            maxLength="6"
                          />
                          <br></br>
                          <input
                            type="submit"
                            style={{
                              width: "30%",
                              backgroundColor: "#121916",
                              color: "white",
                              border: "1px solid #121916",
                              margin: "10px 0px",
                            }}
                            value="Validate OTP"
                          />
                        </center>
                      </form>
                    </center>
                  </div>
                </center>
              )}
              {otpSent === "third" && (
                <center>
                  <div
                    style={{
                      backgroundColor: "",
                      padding: "25px",
                      margin: "40px 0px",
                      border: "2px solid #121916",
                      width: "50%",
                    }}
                  >
                    <center>
                      <h2>
                        <b>Create Password</b>
                      </h2>
                      <h9>
                        <b>Please remember this password</b>
                      </h9>
                      <form onSubmit={submitFinishHandler}>
                        <center>
                          <input
                            type="password"
                            style={{
                              width: "60%",
                              border: "2px solid #121916",
                              textAlign: "center",
                              margin: "10px 0px",
                              borderTopLeftRadius: "10px",
                              borderBottomRightRadius: "10px",
                            }}
                            placeholder="Password"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                          />
                          <input
                            type="password"
                            style={{
                              width: "60%",
                              border: "2px solid #121916",
                              textAlign: "center",
                              margin: "10px 0px",
                              borderTopLeftRadius: "10px",
                              borderBottomRightRadius: "10px",
                            }}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmpass(e.target.value)}
                            value={confirmpass}
                          />
                          <br></br>
                          <input
                            type="submit"
                            style={{
                              width: "30%",
                              backgroundColor: "#121916",
                              color: "white",
                              border: "1px solid #121916",
                              margin: "10px 0px",
                            }}
                            value="Finish"
                          />
                        </center>
                      </form>
                    </center>
                  </div>
                </center>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForgotPassword;
