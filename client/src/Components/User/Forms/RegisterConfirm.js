import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUserConfirm } from "../../../Axios/User/Authentication.js";
import { toast } from "react-toastify";

const RegisterConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  let verificationParameter = null;
  const setRedux = () => {
    if (window !== "undefined" && window.localStorage.getItem("verification")) {
      verificationParameter = JSON.parse(
        window.localStorage.getItem("verification")
      );
    }
    dispatch({
      type: "VERIFICATION",
      payload: verificationParameter,
    });
  };
  React.useEffect(() => {
    setRedux();
  }, []);
  const { verification } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState({ checked: false });

  const confirmRegistration = (e) => {
    e.preventDefault();
    const mainObj = { ...data, ...verification, jwt: params.jwt };
    registerUserConfirm(mainObj)
      .then((res) => {
        toast.success(
          "Congratulations! You have been successfully registered! Please Login to Continue"
        );
        dispatch({
          type: "VERIFICATION",
          payload: null,
        });
        window?.localStorage?.removeItem("verification");
        navigate("/login");
      })

      .catch((err) =>
        toast.error("Unknown Error Occurred! ", err.response.data)
      );
  };
  return (
    <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black" elevation={30} style={{border: "1px solid #4b685b", backgroundColor:"#d3dfda" }}>
                <div className="row g-0">
                 
                  <div className="card-body p-md-5 mx-md-4">
                    <form onSubmit={confirmRegistration}>
                      <center>
                        <h2><b>Confirm Your Registration</b></h2>
                        <p>Enter details for the last step of registration</p>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            style={{backgroundColor:"#d3dfda" }}
                            required={true}
                            readOnly={true}
                            value={verification?.name}
                          />
                          </div>
                        <br></br>
                        <div className="form-group">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            style={{backgroundColor:"#d3dfda" }}
                            required={true}
                            readOnly={true}
                            value={verification?.email}
                          />
                        </div>
                        <br></br>
                        <div className="form-group">
                          <input
                            type="password"
                            placeholder="Enter your password"
                            style={{backgroundColor:"#d3dfda" }}
                            required={true}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            value={data.password}
                          />
                        </div>
                        <br></br>
                        <div className="form-group">
                          <input
                            type="password"
                            placeholder="Confirm your Password"
                            required={true}
                            onChange={(e) =>
                              setData({ ...data, confirmPassword: e.target.value })
                            }
                            value={data.confirmPassword}
                          />
                        </div>
                        <br></br>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary"
                            style={{backgroundColor:"#563f46", color:"white", margin:"auto"}}
                            type="submit"
                            disabled={!data.password || !data.confirmPassword}
                          >
                            Register
                          </button>        
                          <br></br>
                          <br></br>
                        </div>
                      </center>
                    </form>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };       

export default RegisterConfirm;
