import React from "react";
import "../../../Styles/UserPages/MyProfile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-jdenticon-sprites";
import { Helmet } from "react-helmet";
const MyProfile = () => {
  let svg = createAvatar(style, {
    // ... and other options
  });
  console.log(svg);
  function createMarkup(body) {
    return { __html: body };
  }
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <Helmet>
        <title>PetLife | My Profile</title>
      </Helmet>
      <section style={{ backgroundColor: "#eee", fontFamily: "Rubik" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12">
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body text-center">
                  <center>
                    {" "}
                    <div
                      className="mt-3 mb-4"
                      style={{ height: "140px", width: "140px" }}
                      dangerouslySetInnerHTML={createMarkup(svg)}
                    ></div>
                  </center>
                  <h4 className="mb-2">{user?.name}</h4>

                  <h4 className="mb-2">{user?.email}</h4>

                  <button
                    type="button"
                    className="btn btn-dark btn-rounded btn-lg"
                    onClick={(e) => navigate("/update-password")}
                  >
                    Change Password
                  </button>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <p className="mb-2 h5">{user?.petsAdded}</p>
                      <p className="text-muted mb-0">Pets Added</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-2 h5">{user?.bookingsMade}</p>
                      <p className="text-muted mb-0">Bookings Made</p>
                    </div>
                  </div>
                </div>
              </div>
              * Data Present is Refreshed in every Fresh Session
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyProfile;
