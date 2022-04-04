import React from "react";
import { loginAdmin } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [data, setData] = React.useState({ username: "", password: "" });
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    loginAdmin(data)
      .then((res) => {
        toast.success("Welcome Back Admin! 🎉");
        if (window !== "undefined") {
          window.localStorage.setItem("admin", res.data);
          navigate("/admin/home");
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
        setData({ username: "", password: "" });
      });
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone images"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={submitHandler}>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className=""
                  style={{ borderBottom: "1px solid black", color: "black" }}
                  value={data?.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  required
                />
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>
              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  value={data?.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className=""
                  style={{ borderBottom: "1px solid black", color: "black" }}
                  required
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
