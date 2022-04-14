import React from "react";
import "../../Styles/Admin/HotelIndividual.css";
import { useParams } from "react-router-dom";
import {
  getHotelById,
  changeStatus,
  deleteService,
} from "../../Axios/Admin.js";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";
const createMarkup = (word) => {
  return { __html: word };
};
const HotelIndividual = () => {
  const [data, setData] = React.useState(null);
  const params = useParams();
  let token = null;
  if (window !== "undefined" && window.localStorage.getItem("admin")) {
    token = window.localStorage.getItem("admin");
  }
  const getData = () => {
    getHotelById(token, params?.hotelId)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    token && getData();
  }, [token]);

  const changeToActive = async (word) => {
    changeStatus(word, params?.hotelId, token)
      .then((res) => {
        toast.success(`Hotel Made ${word}. Action Successful`);
        token && getData();
      })
      .catch((err) =>
        toast.error(
          "Unexpected Error Occurred! Please Reload the Page, and Try Again"
        )
      );
  };
  const deleteServiceFromAdmin = (hotelId, serviceId) => {
    deleteService(token, hotelId, serviceId)
      .then((res) => {
        toast.success("Service Has been updated successfully");
        token && getData();
      })
      .catch((err) =>
        toast.success(
          "Unexpected Error Occurred! Please Reload the Page, and Try Again"
        )
      );
  };
  return (
    <div className="container emp-profile">
      <div className="row">
        <div className="col-md-12">
          <div className="profile-img mb-5">
            <center>
              <Carousel
                width={"50%"}
                showThumbs={false}
                showArrows={true}
                showIndicators={true}
              >
                {data &&
                  data.images &&
                  data.images.map((curr, index) => {
                    return (
                      <div>
                        <img
                          src={curr?.secure_url}
                          key={index}
                          alt="Hotel Here"
                          style={{ height: "500px", objectFit: "cover" }}
                        />
                      </div>
                    );
                  })}
              </Carousel>
            </center>
          </div>
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="profile-head">
            <h5>{data && data.name}</h5>
            <h6>
              <MailIcon />
              &emsp;
              {data && data?.email}
            </h6>
            <h6>
              {" "}
              <CallIcon /> &emsp; +91 {data && data?.contact}
            </h6>
            <p className="proile-rating">
              Ratings : <span>{data?.starRating ? data?.starRating : 0}/5</span>
            </p>
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
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
        {data?.status === "Queued" && (
          <div className="col-md-2">
            <button
              style={{ backgroundColor: "green" }}
              onClick={() => changeToActive("Active")}
            >
              Change to Active (Queued Now)
            </button>
          </div>
        )}
        {data?.status === "Active" && (
          <div className="col-md-2">
            <button
              style={{ backgroundColor: "orange" }}
              onClick={() => changeToActive("In-Active")}
            >
              Change to Inactive (Active Now)
            </button>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-8">
          <div className="tab-content profile-tab" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row">
                <div className="col-md-6">
                  <label>Hotel Id</label>
                </div>
                <div className="col-md-6">
                  <p>{data && data?._id}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Hotel Address Line 1</label>
                </div>
                <div className="col-md-6">
                  <p>{data && data.address?.data1}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Hotel Address Line 1</label>
                </div>
                <div className="col-md-6">
                  <p>{data && data.address?.data2}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>City</label>
                </div>
                <div className="col-md-6">
                  <p>
                    {data && data.address?.city
                      ? data && data.address?.city
                      : "Not Available"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>State</label>
                </div>
                <div className="col-md-6">
                  <p>{data && data.address?.state}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>PIN Code</label>
                </div>
                <div className="col-md-6">
                  <p>{data && data.address?.PIN}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Short Description</label>
                </div>
                <div className="col-md-6">
                  <p
                    dangerouslySetInnerHTML={createMarkup(
                      data && data?.shortDescription
                        ? data?.shortDescription
                        : "NA"
                    )}
                  ></p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Description</label>
                </div>
                <div className="col-md-6">
                  <p
                    dangerouslySetInnerHTML={createMarkup(
                      data && data?.description ? data?.description : "NA"
                    )}
                  ></p>
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
                          Services
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-8">
          <div className="tab-content profile-tab" id="myTabContent">
            {data &&
              data.services.length > 0 &&
              data.services.map((curr, index) => {
                return (
                  <div
                    className="tab-pane fade show active"
                    key={index}
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Service Time</label>
                      </div>
                      <div className="col-md-6">
                        <p>{curr?.serviceTime} Hours</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Service Price</label>
                      </div>
                      <div className="col-md-6">
                        <p>₹ {curr && curr.servicePrice}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Service Pet</label>
                      </div>
                      <div className="col-md-6">
                        <p>{curr && curr.servicePet}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Service Note (If Available)</label>
                      </div>
                      <div className="col-md-6">
                        <p>
                          {curr?.serviceNote
                            ? curr?.serviceNote
                            : "Not Available"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Facilties</label>
                      </div>
                      <div className="col-md-6">
                        <div>
                          {curr &&
                            curr.servicesList &&
                            curr.servicesList.map((curr1, index) => {
                              return <p key={index}>{curr1}</p>;
                            })}
                        </div>
                      </div>
                    </div>
                    <center>
                      <button
                        style={{
                          backgroundColor: "orange",
                          color: "black",
                          fontFamily: "Rubik",
                          padding: "3px 6px",
                          border: "1px solid orange",
                          borderRadius: "3px",
                        }}
                        onClick={() =>
                          deleteServiceFromAdmin(params.hotelId, curr?._id)
                        }
                      >
                        Delete Service
                      </button>
                    </center>
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelIndividual;
