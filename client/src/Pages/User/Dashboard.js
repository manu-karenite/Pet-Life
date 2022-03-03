import React from "react";
import styles from "../../Styles/UserDashboard.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  return (
    <div>
      Hello
    </div>
  );
};

export default Dashboard;
