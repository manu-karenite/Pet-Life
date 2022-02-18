import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <GitHubIcon onClick={event =>  window.location.href='https://www.google.com'} />
        <TwitterIcon onClick={event =>  window.location.href='http://www.google.com'} /> 
        <MailOutlineIcon onClick={event =>  window.location.href='http://www.yahoo.com'} />
        <LinkedInIcon onClick={event =>  window.location.href='http://www.yahoo.com'} />
      </div>
      <p> &copy; 2022 petlife</p>
    </div>
  );
}

export default Footer;
