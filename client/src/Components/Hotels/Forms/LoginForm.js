import React from "react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://res.cloudinary.com/techbuy/image/upload/v1645255624/hello_pgfv7v.jpg"
                        style={{ width: 185 }}
                        alt="logo"
                      />
                    </div>
                    <form>
                      <p>Hotels Access Portal</p>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Phone number or email address"
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Username
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                        >
                          Log in
                        </button>
                        <a className="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={(e) => navigate("/hotel/register")}
                        >
                          Create new
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h3 className="mb-4">We are more than just partners..</h3>
                    <p className="small mb-0">
                      We help you grow your business, in the most ecstatic
                      method as possible. We bring you curated customers,
                      helping you strive and thrive in your vision, to reach out
                      to all the Pet Owners out there!
                      <br />
                      Join <strong>Pet Life</strong> now, in case you are New
                      Here
                    </p>
                  </div>
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
