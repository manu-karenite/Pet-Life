import React from "react";
import styles from "../../../Styles/UserPages/MyBookings.module.css";
import { getUserBookings } from "../../../Axios/User/Dashboard.js";
import { useSelector } from "react-redux";
import moment from "moment";
import { Helmet } from "react-helmet";
const MyBookings = () => {
  const [data, setData] = React.useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const getData = () => {
    getUserBookings(user?.jwt)
      .then((res) => setData(res.data))
      .catch((err) => {});
  };
  React.useEffect(() => {
    user && getData();
  }, [user]);
  return (
    <>
      <Helmet>
        <title>PetLife | My Bookings</title>
      </Helmet>
      <div className={styles.heading}>My Bookings</div>
      <div className={styles.bookingList}>
        {data.length === 0 && (
          <center>
            <div className={styles.text1}>No Bookings Found! Book One Now!</div>
          </center>
        )}
        {data.length > 0 &&
          data.map((curr, index) => {
            return (
              <div className={styles.booking} key={index}>
                <div className={styles.bLeft}>
                  <div className={styles.text1}>
                    Booking Id : {curr?.bookingId}{" "}
                    <span
                      style={
                        curr?.status === "Pending"
                          ? { backgroundColor: "#FFCC33", padding: "5px 10px" }
                          : curr?.status === "Accepted"
                          ? {
                              backgroundColor: "green",
                              padding: "5px 10px",
                              color: "white",
                            }
                          : { backgroundColor: "#ff5a36", padding: "5px 10px" }
                      }
                    >
                      {curr?.status}
                    </span>
                  </div>

                  <div className={styles.images_text1}>
                    <div className={styles.image}>
                      <img
                        src={curr?.hotel?.images[0]?.secure_url}
                        className={styles.hotelImage}
                        alt="Booked Hotel Images"
                      />
                    </div>
                    <div className={styles.textForImage}>
                      <div className={styles.text2}>{curr?.hotel?.name}</div>
                      <div className={styles.text3}>
                        {curr?.hotel?.address?.data1 +
                          " " +
                          curr?.hotel?.address?.data2}
                      </div>
                      <div className={styles.text3}>
                        {curr?.hotel?.address?.city +
                          " " +
                          curr?.hotel?.address?.state +
                          " " +
                          curr?.hotel?.address?.PIN}
                      </div>
                      <div className={styles.text1}>
                        Slot : {moment(curr?.time).format("LLLL")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.bRight}>
                  <div className={styles.text1}>
                    Booked On : {moment(curr?.createdAt).format("LLLL")}
                  </div>
                  <div className={styles.text5}>
                    {" "}
                    {curr?.billingDetails?.billingName}
                  </div>
                  <div className={styles.text6}>
                    {curr?.billingDetails?.billingEmail}
                  </div>
                  <div className={styles.text6}>
                    {curr?.billingDetails?.billingContact}
                  </div>
                  <div className={styles.text5}>Total : ₹ {curr?.total}</div>
                </div>
                <div className={styles.small_up}>
                  <center>
                    <div className={styles.text1}>
                      Booking Id : {curr?.bookingId}
                    </div>
                    <div
                      className={styles.text1}
                      style={
                        curr?.status === "Pending"
                          ? { backgroundColor: "#FFCC33", padding: "5px 10px" }
                          : curr?.status === "Accepted"
                          ? {
                              backgroundColor: "green",
                              padding: "5px 10px",
                              color: "white",
                            }
                          : { backgroundColor: "#ff5a36", padding: "5px 10px" }
                      }
                    >
                      {curr?.status}
                    </div>
                    <div className={styles.image}>
                      <img
                        src={curr?.hotel?.images[0]?.secure_url}
                        alt="Hotel Booked Images"
                        className={styles.hotelImage}
                      />
                    </div>
                    <div
                      className={styles.text2}
                      style={{ textAlign: "center" }}
                    >
                      Hotel Name
                    </div>
                    <div className={styles.text3}>{curr?.hotel?.name}</div>
                    <div className={styles.text3}>
                      {" "}
                      {curr?.hotel?.address?.data1 +
                        " " +
                        curr?.hotel?.address?.data2}
                    </div>
                    <div className={styles.text1}>
                      {" "}
                      {curr?.hotel?.address?.city +
                        " " +
                        curr?.hotel?.address?.state +
                        " " +
                        curr?.hotel?.address?.PIN}
                    </div>
                  </center>
                  <div className={styles.priceBreakout}>
                    <span className={styles.text2}>Total</span>
                    <span className={styles.text2}>₹ {curr?.total}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MyBookings;
