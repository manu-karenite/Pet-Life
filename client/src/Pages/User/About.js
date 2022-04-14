import React from "react";
import styles from "./About.module.css";
import { Helmet } from "react-helmet";
function About() {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>PetLife | About Us</title>
      </Helmet>
      <div>
        <div className={styles.imageAnimal}>
          <img
            src="https://res.cloudinary.com/techbuy/image/upload/v1649505265/figmu_1_lapi6b.png"
            alt="bgimages"
            className={styles.innerImage}
          />
        </div>
        <div className={styles.text}>
          <br></br>
          <strong>
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                textDecoration: "underline",
              }}
            >
              ABOUT US
            </h1>
          </strong>
          <div className={styles.innerText}>
            We, the PetLife team, work together to provide you with the best
            hotels present out there for the pets. We provide you the best
            prices and discounts. You can avail various services provided by the
            different hotels by clicking on a hotel. Also, feel free to contact
            us in case of any queries. We will try our best to provide you the
            best service and quick response.
          </div>
        </div>
        <div className={styles.imageAnimal}>
          <img
            src="https://res.cloudinary.com/techbuy/image/upload/v1649505234/pawsfigma_1_bwfvkc.png"
            alt="bgimages"
            className={styles.outerImage}
          />
        </div>
      </div>
    </>
  );
}

export default About;
