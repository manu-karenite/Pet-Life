import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../Axios/User/Authentication.js";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const loginHandler = (e) => {
    console.log(data);
    loginUser(data)
      .then((res) => {
        if (window !== undefined) {
          window.localStorage.setItem(
            "UserLoggedIn",
            JSON.stringify(res.data)
          );
        }
        toast.success("Login Success!");
        navigate("/dashboard");
      })
      .catch((err) => toast.error(err.response.data));
  };
  return (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black" elevation={30} style={{border: "1px solid #4b685b", backgroundColor:"#d3dfda" }}>
              <div className="row g-0">
               
                <div className="card-body p-md-5 mx-md-4">
                  <form>
                    <center>
                      <h2><b>Login</b></h2>
                      <p>Enter your account details to continue</p>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          placeholder="Email"
                          style={{backgroundColor:"#d3dfda" }}
                          value={data.username || ""}
                          onChange={(e) =>
                            setData({ ...data, username: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          placeholder="Password"
                          style={{backgroundColor:"#d3dfda" }}
                          value={data.password || ""}
                          onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                          }
                        />
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          style={{width:"30%", backgroundColor:"#563f46", color:"white", margin:"auto"}}
                          className="btn btn-primary btn-block fa-lg mb-3"
                          type="button"
                          onClick={loginHandler}
                        >
                          Log in
                        </button>
                        <a className="text-muted" href="/forgot-password">
                          Forgot password?
                        </a>
                        <div>
                          <p className="mb-0 me-2">Don't have an account?
                            <a className="text-muted" href="/register">
                              Sign up here
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

export default LoginForm;