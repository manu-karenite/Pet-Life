import React from "react";
import { getAllBookings } from "../../Axios/Admin.js";
import { Table } from "antd";
import { Link } from "react-router-dom";
const columns = [
  {
    title: (
      <h6 style={{ fontWeight: "bolder" }}>
        <strong>User Id</strong>
      </h6>
    ),
    dataIndex: "user",
    sorter: (a, b) => a < b,
    align: "center",
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          {text}
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ fontWeight: "bolder" }}>
        <strong>Booking Id</strong>
      </h6>
    ),
    dataIndex: "bookingId",
    sorter: (a, b) => a.bookingId < b.bookingId,
    align: "center",
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          <Link to={`/admin/booking/${text}`}>{text}</Link>
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ fontWeight: "bolder" }}>
        <strong>Total Amount</strong>
      </h6>
    ),
    dataIndex: "total",
    sorter: (a, b) => a.total < b.total,
    align: "center",
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          ₹ {text}
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ fontWeight: "bolder" }}>
        <strong>Booking Name</strong>
      </h6>
    ),
    dataIndex: "billingDetails",
    sorter: (a, b) => a.billingName < b.billingName,
    align: "center",
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          {text.billingName}
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ fontWeight: "bolder" }}>
        <strong>Booking Contact</strong>
      </h6>
    ),
    dataIndex: "billingDetails",
    sorter: (a, b) => a.billingContact < b.billingContact,
    align: "center",
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          {text.billingContact}
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ fontWeight: "bolder" }}>
        <strong>Hotel Name</strong>
      </h6>
    ),
    dataIndex: "hotel",
    width: "200px",
    sorter: (a, b) => a.name < b.name,
    align: "center",
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          {text.name}
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ fontWeight: "bolder" }}>
        <strong>Status</strong>
      </h6>
    ),
    dataIndex: "status",
    width: "200px",

    align: "center",
    render: function (text, record, index) {
      return text === "Pending" ? (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
            backgroundColor: "orange",
            padding: "5px 10px",
          }}
        >
          {text}
        </span>
      ) : text === "Accepted" ? (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
            backgroundColor: "green",
            padding: "5px 10px",
          }}
        >
          {text}
        </span>
      ) : (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
            backgroundColor: "red",
            padding: "5px 10px",
          }}
        >
          {text}
        </span>
      );
    },
  },
];

const Bookings = () => {
  const [allBookings, setAllBookings] = React.useState([]);
  let token = null;
  if (window !== "undefined" && window.localStorage.getItem("admin")) {
    token = window.localStorage.getItem("admin");
  }
  const getData = () => {
    getAllBookings(token)
      .then((res) => setAllBookings(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    token && getData();
  }, [token]);
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <>
      {" "}
      <div className="row justify-content-center" style={{ marginTop: "50px" }}>
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
            <h3 style={{ fontFamily: "Rubik" }}>Bookings</h3>
            <p style={{ fontFamily: "Rubik" }}>Manage Bookings Here</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <Table
              columns={columns}
              dataSource={allBookings}
              onChange={onChange}
            />
          </div>
          <div className="col-md-1" />
        </div>
      </div>
    </>
  );
};

export default Bookings;
