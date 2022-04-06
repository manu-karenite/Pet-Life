import React from "react";
import { getAllHotels } from "../../Axios/Admin.js";
import { Table } from "antd";
import { Link } from "react-router-dom";
const columns = [
  {
    title: (
      <h6>
        <strong>Hotel Id</strong>
      </h6>
    ),
    dataIndex: "_id",
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
          <Link to={`/admin/hotel/${text}`}>{text}</Link>
        </span>
      );
    },
  },
  {
    title: (
      <h6>
        <strong>Hotel Name</strong>
      </h6>
    ),
    dataIndex: "name",
    width: "300px",
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
          {text}
        </span>
      );
    },
  },
  {
    title: (
      <h6>
        <strong>Hotel Email</strong>
      </h6>
    ),
    dataIndex: "email",
    align: "center",

    sorter: (a, b) => a.email < b.email,
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
      <h6>
        <strong>Hotel Contact</strong>
      </h6>
    ),
    width: "150px",
    dataIndex: "contact",
    align: "center",
    sorter: (a, b) => a.contact < b.contact,
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          +91 {text}
        </span>
      );
    },
  },
  {
    title: (
      <h6>
        <strong>Services Offered</strong>
      </h6>
    ),
    dataIndex: "services",
    align: "center",

    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          {text.length}
        </span>
      );
    },
  },
  {
    title: (
      <h6>
        <strong>City</strong>
      </h6>
    ),
    dataIndex: "address",
    align: "center",
    sorter: (a, b) => a.address.city < b.address.city,
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          {text.city}
        </span>
      );
    },
  },
  {
    title: (
      <h6>
        <strong>State</strong>
      </h6>
    ),
    dataIndex: "address",
    align: "center",
    sorter: (a, b) => a.address.state < b.address.state,
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
          }}
        >
          {text.state}
        </span>
      );
    },
  },
  {
    title: (
      <h6>
        <strong>Status</strong>
      </h6>
    ),
    dataIndex: "status",
    align: "center",
    width: "150px",

    sorter: (a, b) => a.status < b.status,
    render: function (text, record, index) {
      return text === "Active" ? (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          {text}
        </span>
      ) : text === "In-Active" ? (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "red",
          }}
        >
          {text}
        </span>
      ) : (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "orange",
          }}
        >
          {text}
        </span>
      );
    },
  },
];

const Hotels = () => {
  const [allHotels, setAllHotels] = React.useState([]);
  let token = null;
  if (window !== "undefined" && window.localStorage.getItem("admin")) {
    token = window.localStorage.getItem("admin");
  }
  const getData = () => {
    getAllHotels(token)
      .then((res) => setAllHotels(res.data))
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
      <div
        className="row justify-content-center"
        style={{ marginTop: "100px" }}
      >
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
            <h3 style={{ fontFamily: "Rubik" }}>Hotels</h3>
            <p style={{ fontFamily: "Rubik" }}>
              Manage Hotels and their Services Here
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <Table
              columns={columns}
              dataSource={allHotels}
              onChange={onChange}
            />
          </div>
          <div className="col-md-1" />
        </div>
      </div>
    </>
  );
};

export default Hotels;
