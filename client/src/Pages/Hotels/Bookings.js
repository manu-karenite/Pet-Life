import React from "react";
import {
  getHotelBook,
  acceptRejectBooking,
} from "../../Axios/Hotel/Dashboard.js";
import { useSelector } from "react-redux";
import { Table, Tag, Space } from "antd";
import moment from "moment";
import { toast } from "react-toastify";

const Bookings = () => {
  const { hotel } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState([]);
  const getData = () => {
    getHotelBook(hotel?.jwt, hotel?._id)
      .then((res) => setData(res.data))
      .catch((err) => {});
  };
  React.useEffect(() => {
    hotel && getData();
  }, [hotel]);
  const changeStatus = (id, status) => {
    let ans = window.confirm(
      `Are you Sure you want to ${status ? "Accept" : "Reject"} this Booking?`
    );
    if (!ans) return;
    console.log(id, status);
    acceptRejectBooking(hotel?.jwt, status, id)
      .then((res) => {
        toast.success("Booking Status Changed Successfully!");
        getData();
      })
      .catch((err) => toast.error("Booking Status Could not be Changed"));
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>{text}</span>
      ),
    },
    {
      title: "Hotel",
      dataIndex: "hotel",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {text.name}
        </span>
      ),
    },
    {
      title: "Booking Name",
      dataIndex: "billingDetails",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {text.billingName}
        </span>
      ),
    },
    {
      title: "Booking Email",
      dataIndex: "billingDetails",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {text.billingEmail}
        </span>
      ),
    },
    {
      title: "Slot Date",
      dataIndex: "time",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {moment(new Date(text)).format("MMMM Do YYYY")}
        </span>
      ),
    },
    {
      title: "Slot Time",
      dataIndex: "time",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {moment(new Date(text)).format("hh:mm:ss a")}
        </span>
      ),
    },
    {
      title: "Amount Payable",
      dataIndex: "total",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          ₹ {text}
        </span>
      ),
    },
    {
      title: "Accept",
      dataIndex: "_id",
      align: "center",
      render: (text) => (
        <button
          style={{
            fontWeight: "bold",
            fontFamily: "Rubik",
            backgroundColor: "green",
            color: "white",
            padding: "5px 10px",
          }}
          onClick={() => changeStatus(text, 1)}
        >
          Accept
        </button>
      ),
    },
    {
      title: "Reject",
      dataIndex: "_id",
      align: "center",
      render: (text) => (
        <button
          style={{
            fontWeight: "bold",
            fontFamily: "Rubik",
            backgroundColor: "red",
            color: "white",
            padding: "5px 10px",
          }}
          onClick={() => changeStatus(text, 0)}
        >
          Reject
        </button>
      ),
    },
  ];

  const columns2 = [
    {
      title: "Id",
      dataIndex: "_id",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>{text}</span>
      ),
    },
    {
      title: "Hotel",
      dataIndex: "hotel",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {text.name}
        </span>
      ),
    },
    {
      title: "Booking Name",
      dataIndex: "billingDetails",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {text.billingName}
        </span>
      ),
    },
    {
      title: "Booking Email",
      dataIndex: "billingDetails",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {text.billingEmail}
        </span>
      ),
    },
    {
      title: "Slot Date",
      dataIndex: "time",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {moment(new Date(text)).format("MMMM Do YYYY")}
        </span>
      ),
    },
    {
      title: "Slot Time",
      dataIndex: "time",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {moment(new Date(text)).format("hh:mm:ss a")}
        </span>
      ),
    },
    {
      title: "Amount Payable",
      dataIndex: "total",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          ₹ {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "_id",
      align: "center",
      render: (text) => (
        <div
          style={{
            fontWeight: "bold",
            fontFamily: "Rubik",
            backgroundColor: "green",
            color: "white",
            padding: "5px 10px",
          }}
        >
          Accepted
        </div>
      ),
    },
  ];

  const columns3 = [
    {
      title: "Id",
      dataIndex: "_id",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>{text}</span>
      ),
    },
    {
      title: "Hotel",
      dataIndex: "hotel",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {text.name}
        </span>
      ),
    },
    {
      title: "Booking Name",
      dataIndex: "billingDetails",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {text.billingName}
        </span>
      ),
    },
    {
      title: "Booking Email",
      dataIndex: "billingDetails",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {text.billingEmail}
        </span>
      ),
    },
    {
      title: "Slot Date",
      dataIndex: "time",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {moment(new Date(text)).format("MMMM Do YYYY")}
        </span>
      ),
    },
    {
      title: "Slot Time",
      dataIndex: "time",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          {moment(new Date(text)).format("hh:mm:ss a")}
        </span>
      ),
    },
    {
      title: "Amount Payable",
      dataIndex: "total",
      align: "center",
      render: (text) => (
        <span style={{ fontWeight: "bold", fontFamily: "Rubik" }}>
          ₹ {text}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "_id",
      align: "center",
      render: (text) => (
        <div
          style={{
            fontWeight: "bold",
            fontFamily: "Rubik",
            backgroundColor: "red",
            color: "white",
            padding: "5px 10px",
          }}
        >
          Rejected
        </div>
      ),
    },
  ];
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <div
              style={{
                fontFamily: "Rubik",
                fontWeight: "bold",
                fontSize: "30px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Pending Bookings
            </div>
            <Table columns={columns} dataSource={data?.e1} />
            <div
              style={{
                fontFamily: "Rubik",
                fontWeight: "bold",
                fontSize: "30px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Accepted Bookings
            </div>
            <Table columns={columns2} dataSource={data?.e2} />
            <div
              style={{
                fontFamily: "Rubik",
                fontWeight: "bold",
                fontSize: "30px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Cancelled Bookings
            </div>
            <Table columns={columns3} dataSource={data?.e3} />
          </div>
          <div class="col-md-1"></div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
