import React from "react";
import styles from "../../Styles/UserPages/YourPet.module.css";
import { toast } from "react-toastify";
import { createPet } from "../../Axios/User/Dashboard.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppstoreOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
const YourPet = () => {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  const [load, setLoad] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState({
    name: "",
    age: "",
    mark: "",
    all1: "",
    all2: "",
    all3: "",
    category: "Cats",
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!data.name || data.name === "") {
      toast.warning("Please Enter a Nickname of Your Pet");
      return;
    }
    if (!data.age || data.age === "") {
      toast.warning("Please Enter age of Your Pet In Months");
      return;
    }
    if (!data.mark || data.mark === "") {
      toast.warning("Please Enter an Identification Mark of Your Pet");
      return;
    }
    console.log(data);
    setLoad(true);
    createPet(user?.jwt, data)
      .then((res) => {
        toast.success("Pet Details Have Been Saved Successfully");
        navigate("/dashboard/my-pets");
        setLoad(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoad(false);
      });
  };
  return (
    <>
      {" "}
      <Helmet>
        <title>PetLife | Add Pets</title>
      </Helmet>
      <div className={styles.heading}>Your Pet</div>
      <center>
        <div className={styles.outer}>
          <form onSubmit={submitHandler}>
            <div>
              <input
                type="text"
                placeholder="Your Pet Nickname"
                value={data?.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Your Pet Age (in months)"
                value={data?.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Your Pet's Identification Mark"
                value={data?.mark}
                onChange={(e) => setData({ ...data, mark: e.target.value })}
              />
            </div>
            <div className={styles.addressHead1}>
              Specify if Any Allergies :
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Allergy "
                value={data?.all1}
                onChange={(e) => setData({ ...data, all1: e.target.value })}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Allergy"
                value={data?.all2}
                onChange={(e) => setData({ ...data, all2: e.target.value })}
              />
            </div>
            <div>
              <input
                type="text"
                value={data?.all3}
                onChange={(e) => setData({ ...data, all3: e.target.value })}
                placeholder="Enter Allergy"
              />
            </div>

            <div className={styles.selectPets}>
              <div className={styles.addressHead1}>
                Select your Pet Category
              </div>
              <div>
                <div className={styles.radioButtonDiv}>
                  <input
                    type="radio"
                    id="Cats"
                    name="pets"
                    defaultValue="Cats"
                    defaultChecked
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  />
                  <label htmlFor="Cats">Cats</label>
                </div>
                <div className={styles.radioButtonDiv}>
                  <input
                    type="radio"
                    id="Dogs"
                    name="pets"
                    defaultValue="Dogs"
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  />
                  <label htmlFor="Dogs">Dogs</label>
                </div>
                <div className={styles.radioButtonDiv}>
                  <input
                    type="radio"
                    id="Fishes"
                    name="pets"
                    defaultValue="Fishes"
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  />
                  <label htmlFor="Fishes">Fishes</label>
                </div>
                <div className={styles.radioButtonDiv}>
                  <input
                    type="radio"
                    id="Birds"
                    name="pets"
                    defaultValue="Birds"
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  />
                  <label htmlFor="Birds">Birds</label>
                </div>
                <div className={styles.radioButtonDiv}>
                  <input
                    type="radio"
                    id="Rabbits"
                    name="pets"
                    defaultValue="Rabbits"
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  />
                  <label htmlFor="Rabbits">Rabbits</label>
                </div>
              </div>
            </div>
            <div className={styles.priceButton}>
              <button onClick={submitHandler}>
                {load ? (
                  <AppstoreOutlined
                    style={{ fontSize: 25 }}
                    spin={load}
                    disabled={load}
                  />
                ) : (
                  "Add Pet"
                )}
              </button>
            </div>
          </form>
        </div>
      </center>
    </>
  );
};

export default YourPet;
