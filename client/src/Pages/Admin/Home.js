import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-lg-6">
            {/* Section Heading*/}
            <div
              className="section_heading text-center wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <h3 style={{ fontFamily: "Rubik", marginTop: "50px" }}>
                Admin<span> Portal</span>
              </h3>
              <p style={{ fontFamily: "Rubik" }}>
                Welcome Back to Admin Panel of Pet Life &copy;
                <br />
                Manage Your Bookings, Users, Hotels and Pets Registered in Pet
                Life Database
              </p>
              <div className="line" />
            </div>
          </div>
        </div>
        <div className="row">
          {/* Single Advisor*/}
          <div
            className="col-12 col-sm-6 col-lg-3"
            style={{ cursor: "pointer" }}
          >
            <Link to="/admin/hotels">
              <div
                className="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Team Thumb*/}
                <div className="advisor_thumb">
                  <img
                    src="https://res.cloudinary.com/techbuy/image/upload/v1649081873/traveling-gf43d9419d_1280_g2wbuz.png"
                    alt="Hotel Portal"
                    style={{
                      objectFit: "cover",
                      height: "315px",
                      width: "315px",
                    }}
                  />
                  {/* Social Info*/}
                </div>
                {/* Team Details*/}
                <div className="single_advisor_details_info">
                  <h6>Hotels</h6>
                  <p className="designation">View and Manage Hotels</p>
                </div>
              </div>
            </Link>
          </div>
          {/* Single Advisor*/}
          <div
            className="col-12 col-sm-6 col-lg-3"
            style={{ cursor: "pointer" }}
          >
            <Link to="/admin/pets">
              <div
                className="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.3s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.3s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Team Thumb*/}
                <div className="advisor_thumb">
                  <img
                    src="https://res.cloudinary.com/techbuy/image/upload/v1649082095/cat-ga86f8d7df_1920_ct9zmk.png"
                    alt="Pets Portal"
                    style={{
                      objectFit: "cover",
                      height: "315px",
                      width: "315px",
                    }}
                  />
                  {/* Social Info*/}
                </div>
                {/* Team Details*/}
                <div className="single_advisor_details_info">
                  <h6>Pets</h6>
                  <p className="designation">View and Manage Pets Registered</p>
                </div>
              </div>
            </Link>
          </div>
          {/* Single Advisor*/}
          <div
            className="col-12 col-sm-6 col-lg-3"
            style={{ cursor: "pointer" }}
          >
            <Link to="/admin/users">
              <div
                className="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.4s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.4s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Team Thumb*/}
                <div className="advisor_thumb">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                    alt="User Portal"
                  />
                  {/* Social Info*/}
                </div>
                {/* Team Details*/}
                <div className="single_advisor_details_info">
                  <h6>Users</h6>
                  <p className="designation">
                    View and Manage Registered Users
                  </p>
                </div>
              </div>
            </Link>
          </div>
          {/* Single Advisor*/}
          <div
            className="col-12 col-sm-6 col-lg-3"
            style={{ cursor: "pointer" }}
          >
            <Link to="/admin/bookings">
              <div
                className="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.5s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.5s",
                  animationName: "fadeInUp",
                }}
              >
                {/* Team Thumb*/}
                <div className="advisor_thumb">
                  <img
                    src="https://res.cloudinary.com/techbuy/image/upload/v1649082327/achievement-g24ae45738_1280_rlyaam.png"
                    alt="Bookings Portal"
                    style={{
                      objectFit: "cover",
                      height: "315px",
                      width: "315px",
                    }}
                  />
                  {/* Social Info*/}
                </div>
                {/* Team Details*/}
                <div className="single_advisor_details_info">
                  <h6>Bookings</h6>
                  <p className="designation">View and Manage Bookings</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
