import React from "react";
import { getAllPets } from "../../Axios/Admin.js";
import { Table } from "antd";
import { Link } from "react-router-dom";
const columns = [
  {
    title: (
      <h6 style={{ textAlign: "center" }}>
        <strong>Pet Id</strong>
      </h6>
    ),
    dataIndex: "_id",
    sorter: (a, b) => a._id < b._id,
    render: function (text, record, index) {
      return (
        <span
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "bold",
            color: "brown",
          }}
        >
          <Link to={`/admin/pet/${text}`}>{text}</Link>
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ textAlign: "center" }}>
        <strong>User Associated</strong>
      </h6>
    ),
    dataIndex: "user",
    sorter: (a, b) => a.user < b.user,
    render: function (text, record, index) {
      return (
        <span style={{ fontFamily: "Nunito Sans", fontWeight: "bold" }}>
          {text}
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ textAlign: "center" }}>
        <strong>Nickname</strong>
      </h6>
    ),
    dataIndex: "nickname",
    sorter: (a, b) => a.nickname < b.nickname,
    render: function (text, record, index) {
      return (
        <span style={{ fontFamily: "Nunito Sans", fontWeight: "bold" }}>
          {text}
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ textAlign: "center" }}>
        <strong>Age</strong>
      </h6>
    ),
    dataIndex: "age",
    sorter: (a, b) => a.age < b.age,
    render: function (text, record, index) {
      return (
        <span style={{ fontFamily: "Nunito Sans", fontWeight: "bold" }}>
          {text}
        </span>
      );
    },
  },
  {
    title: (
      <h6 style={{ textAlign: "center" }}>
        <strong>Category</strong>
      </h6>
    ),
    dataIndex: "category",
    sorter: (a, b) => a.category < b.category,
    render: function (text, record, index) {
      return (
        <span style={{ fontFamily: "Nunito Sans", fontWeight: "bold" }}>
          {text}
        </span>
      );
    },
  },
];

const Pets = () => {
  const [allPets, setAllPets] = React.useState([]);
  let token = null;
  if (window !== "undefined" && window.localStorage.getItem("admin")) {
    token = window.localStorage.getItem("admin");
  }
  const getData = () => {
    getAllPets(token)
      .then((res) => setAllPets(res.data))
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
            <h3 style={{ fontFamily: "Rubik" }}>Pets</h3>
            <p style={{ fontFamily: "Rubik" }}>
              Manage Pets Regsitered by User on Pet Life &copy;
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Table columns={columns} dataSource={allPets} onChange={onChange} />
          </div>
          <div className="col-md-3" />
        </div>
      </div>
    </>
  );
};

export default Pets;
