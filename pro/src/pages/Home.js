import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/back.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Pet Life </h1>
        <p> For the love of dogs and cats...</p>
        <Link to="/menu">
          <button> BOOK NOW </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
