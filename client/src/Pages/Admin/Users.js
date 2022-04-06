import React from "react";
import { getAllUsers } from "../../Axios/Admin.js";
import { Table } from "antd";
const columns = [
  {
    title: "User Id",
    dataIndex: "_id",
    sorter: (a, b) => a._id < b._id,
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
    title: "Name",
    dataIndex: "name",
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
    title: "Email Address",
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
];

const Users = () => {
  const [allUsers, setAllUsers] = React.useState([]);
  let token = null;
  if (window !== "undefined" && window.localStorage.getItem("admin")) {
    token = window.localStorage.getItem("admin");
  }
  const getData = () => {
    getAllUsers(token)
      .then((res) => setAllUsers(res.data))
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
            <h3 style={{ fontFamily: "Rubik" }}>Users</h3>
            <p style={{ fontFamily: "Rubik" }}>Manage Users Here</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Table
              columns={columns}
              dataSource={allUsers}
              onChange={onChange}
            />
          </div>
          <div className="col-md-3" />
        </div>
      </div>
    </>
  );
};

export default Users;
