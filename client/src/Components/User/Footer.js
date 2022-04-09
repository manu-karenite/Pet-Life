import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailIcon from "@mui/icons-material/Mail";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <div className={styles.footerWrap}>
      <div className={styles.footerItem}>
        <Link to="/about">
          {" "}
          <div className={styles.footerLeft}>About Us</div>
        </Link>
        <Link to="/terms-and-conditions">
          <div className={styles.footerLeft}> Terms and Conditions</div>
        </Link>
        {/* <div className={styles.footerLeft}> Responsible Disclosures</div> */}
      </div>
      <div className={styles.footerItem}>
        <div className={styles.footerLeft} style={{ fontSize: "150%" }}>
          Reach Us
        </div>

        <div className={styles.description}>
          Feel free to contact us, in case of any queries. Contact us from
          Monday to Sunday, between 09:00 IST to 18:00 IST
        </div>
        <div className={styles.footerIcons}>
          <div className={styles.footerIcon}>
            <GitHubIcon sx={{ fontSize: 40, color: "#fff" }} />
          </div>
          <div className={styles.footerIcon}>
            <a href="mailto:business.petlife@gmail.com">
              <MailIcon sx={{ fontSize: 40, color: "#fff" }} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerItem}>
        <div className={styles.footerLeft} style={{ fontSize: "150%" }}>
          Become Our Partner
        </div>
        <div className={styles.description}>
          Support us in our Mission to achieve well cared pets around the
          country. Join us and Get Amazing Deals.
        </div>
        <div className={styles.footerLeft} style={{ fontSize: "20px" }}>
          Note for Partners
        </div>
        <center>
          {" "}
          <button className={styles.loginBtn}>
            <Link to="/hotel/register" style={{ color: "#411313" }}>
              Login
            </Link>
          </button>
        </center>
      </div>
    </div>
  );
}

export default Footer;
