import React from "react";

import { useParams, Link } from "react-router-dom";
import { getBookingById } from "../../Axios/Admin.js";
const BookingIndividual = () => {
  const params = useParams();
  const [pet, setPet] = React.useState(null);
  let token = null;
  if (window !== "undefined" && window.localStorage.getItem("admin")) {
    token = window.localStorage.getItem("admin");
  }
  const getData = () => {
    getBookingById(token, params?.bookingId)
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
                    Billing Details
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
                  <label>Billing Email</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.billingDetails?.billingEmail}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Billing Contact</label>
                </div>
                <div className="col-md-6">
                  <p>+91 {pet?.billingDetails?.billingContact}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Billing Customer Name</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.billingDetails?.billingName}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Billing Customer Address</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.billingDetails?.billingAddress1}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Billing Customer Address</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.billingDetails?.billingAddress1}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Billing PIN</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.billingDetails?.billingPin}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Billing City</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.billingDetails?.billingCity}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Billing State</label>
                </div>
                <div className="col-md-6">
                  <p>{pet?.billingDetails?.billingState}</p>
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
                        Hotel Details
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Hotel Id </label>
                </div>
                <div className="col-md-6">
                  <p>
                    <u>
                      <Link to={`/admin/hotel/${pet?.hotel?._id}`}>
                        {pet?.hotel?._id}
                      </Link>{" "}
                    </u>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Hotel Name </label>
                </div>
                <div className="col-md-6">
                  <p> {pet?.hotel?.name}</p>
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
                        Payment Breakout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Base Charges </label>
                </div>
                <div className="col-md-6">
                  <p>₹ {pet?.baseCharge}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Taxes@ 18% </label>
                </div>
                <div className="col-md-6">
                  <p>+ ₹ {pet?.taxes}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Pickup Charge </label>
                </div>
                <div className="col-md-6">
                  <p> + ₹ {pet?.charge}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Discount </label>
                </div>
                <div className="col-md-6">
                  <p>- ₹ {pet?.couponDiscount}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Total </label>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>₹ {pet?.total}</strong>
                  </p>
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
                        Additional Info
                      </a>
                    </li>
                  </ul>
                </div>
              </div>{" "}
              <div className="row">
                <div className="col-md-6">
                  <label>Coupon Applied </label>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>{pet?.coupon ? pet?.coupon : "Not Applied"}</strong>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Payment Mode </label>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>{pet?.paymentMode}</strong>
                  </p>
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

export default BookingIndividual;
