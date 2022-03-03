import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../../../Axios/User/Authentication.js";

const RegisterForm = () => {
  //declaring react functions
  const dispatch = useDispatch();
  const [data, setData] = React.useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(data)
      .then((res) => {
        //prepare to send it to Local Storage
        if (window !== "undefined") {
          window.localStorage.setItem(
            "verification",
            JSON.stringify({
              email: data.email,
              name: data.name
            })
          );
        }
        dispatch({
          type: "VERIFICATION",
          payload: {
            email: data.email,
            name: data.name
          },
        });
        toast.success("Email has been sent to your email for further steps!");
      })
      .catch((err) => toast.error(err.response.data));
  };
  return(
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black" elevation={30} style={{border: "1px solid #4b685b", backgroundColor:"#d3dfda" }}>
                <div className="row g-0">
                 
                  <div className="card-body p-md-5 mx-md-4">
                    <form onSubmit={submitHandler}>
                      <center>
                        <h2><b>Sign Up</b></h2>
                        <p>Enter your account details to register</p>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            style={{backgroundColor:"#d3dfda" }}
                            required={true}
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                          />
                        </div>
                        <br></br>
                        <div className="form-group">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            style={{backgroundColor:"#d3dfda" }}
                            required={true}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            value={data.email}
                          />
                        </div>
                        <br></br>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary"
                            style={{backgroundColor:"#563f46", color:"white", margin:"auto"}}
                            type="submit"
                            disabled={!data.name || !data.email}
                          >
                            Register
                          </button>
                          <br></br>
                          <br></br>
                          <div>
                            <p className="mb-0 me-2">Already registered?
                              <a className="text-muted" href="/login">
                                Login here
                              </a>
                            </p>
                          </div>
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

export default RegisterForm;
