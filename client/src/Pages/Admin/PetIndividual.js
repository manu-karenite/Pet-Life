import React from "react";
import { useParams } from "react-router-dom";
import { getPetById } from "../../Axios/Admin.js";
const PetIndividual = () => {
  const params = useParams();
  const [pet, setPet] = React.useState(null);
  let token = null;
  if (window !== "undefined" && window.localStorage.getItem("admin")) {
    token = window.localStorage.getItem("admin");
  }
  const getData = () => {
    getPetById(token, params?.petId)
      .then((res) => setPet(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    token && getData();
  }, [token]);
  return (
    <>
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-md-3"></div>
        <div className="col-md-8">
          <div className="col-md-6">
            <div className="profile-head">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    About Pet
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content profile-tab" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row">
                <div className="col-md-6">
                  <label>Pet Id</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?._id}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Nickname</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.nickname}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Pet Age</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.age} Months</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Identification Mark</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.identificationMark}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Pet Category</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.category}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Allergies
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Allergy 1 </label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.allergy1 ? pet?.allergy1 : "Not Entered"}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Allergy 2 </label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.allergy2 ? pet?.allergy2 : "Not Entered"}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Allergy 3 </label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.allergy3 ? pet?.allergy3 : "Not Entered"}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        User Associated
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>User Id </label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.user?._id}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>User Email </label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.user?.email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>User Contact </label>
                </div>
                <div className="col-md-6">
                  <p>+91 {pet?.user?.contact}</p>
                </div>
              </div>
              {/* <center>
                <button
                  style={{
                    backgroundColor: "orange",
                    color: "black",
                    fontFamily: "Rubik",
                    padding: "3px 6px",
                    border: "1px solid orange",
                    borderRadius: "3px",
                  }}
                >
                  Delete Service
                </button>
              </center> */}
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetIndividual;
