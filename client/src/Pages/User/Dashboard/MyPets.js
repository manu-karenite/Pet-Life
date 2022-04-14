import React from "react";
import styles from "../../../Styles/UserPages/MyBookings.module.css";
import { getPetDetails, deleteMyPet } from "../../../Axios/User/Dashboard.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
const MyPets = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const getData = () => {
    getPetDetails(user?.jwt)
      .then((res) => setData(res.data))
      .catch((err) => {});
  };
  React.useEffect(() => {
    user && getData();
  }, [user]);

  const deleteHandler = (id) => {
    deleteMyPet(user?.jwt, id)
      .then((res) => {
        toast.success("Pet has been deleted Succesfully!");
        getData();
      })
      .catch((err) => toast.error(err.response.data));
  };
  return (
    <>
      <Helmet>
        <title>PetLife | My Pets</title>
      </Helmet>
      <div className={styles.heading}>My Pets</div>
      <div className={styles.bookingList1}>
        {data.length > 0 &&
          data.map((CURR, INDEX) => {
            return (
              <div className={styles.items} key={INDEX}>
                <div
                  className={styles.text1}
                  style={{ fontSize: "18px", textAlign: "center" }}
                >
                  Pet Id : {CURR?._id}
                </div>
                <div className={styles.text2} style={{ textAlign: "center" }}>
                  Nickname : {CURR?.nickname}
                </div>
                <div
                  className={styles.text1}
                  style={{ fontSize: "18px", textAlign: "center" }}
                >
                  Age : {CURR?.age} Months
                </div>
                <div
                  className={styles.text1}
                  style={{ fontSize: "18px", textAlign: "center" }}
                >
                  Category : {CURR?.category}
                </div>
                <div
                  className={styles.text1}
                  style={{ fontSize: "18px", textAlign: "center" }}
                >
                  Mark : {CURR?.identificationMark}
                </div>
                <div
                  className={styles.text1}
                  style={{ fontSize: "18px", textAlign: "center" }}
                >
                  Allergies (if any) :
                </div>
                <div className={styles.text3} style={{ textAlign: "center" }}>
                  {CURR?.allergy1 ? CURR?.allergy1 : "Not Available"}
                </div>
                <div className={styles.text3} style={{ textAlign: "center" }}>
                  {CURR?.allergy2 ? CURR?.allergy2 : "Not Available"}
                </div>
                <div className={styles.text3} style={{ textAlign: "center" }}>
                  {CURR?.allergy3 ? CURR?.allergy3 : "Not Available"}
                </div>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={(e) => deleteHandler(CURR?._id)}
                >
                  Delete Pet
                </button>
                {/* <button style={{ backgroundColor: "blue" }}>Edit Pet</button> */}
              </div>
            );
          })}
      </div>
      <center>
        <button
          className={styles.addPetBtn}
          onClick={(e) => navigate("/your-pet")}
        >
          Add a Pet
        </button>
      </center>
    </>
  );
};

export default MyPets;
