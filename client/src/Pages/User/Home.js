import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../../Assets/back.jpeg";
import styles from "../../Styles/Home.module.css";
import { Helmet } from "react-helmet";
function Home() {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>PetLife</title>
      </Helmet>
      <div className={styles.upper}>
        <div className={styles.upper1}>
          <div className={styles.round1}>Pet Life &copy;</div>
          <br />
          <div className={styles.round1}>For the Love of Your Pets</div>
          <br />
          <center>
            <Link to="/menu">
              <button className={styles.round2}>Book now</button>
            </Link>
          </center>
          <br />
        </div>
        <div className={styles.upper2}>
          <img
            src="https://res.cloudinary.com/techbuy/image/upload/v1649576105/back_wtmfdm.jpg"
            alt="BannerImage"
            className={styles.upper3}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
