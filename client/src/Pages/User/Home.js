import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../../Assets/back.jpeg";
import "../../Styles/Home.css";

function Home() {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer"></div>
    </div>
  );
}

export default Home;
