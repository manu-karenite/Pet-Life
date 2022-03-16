import React from "react";
import styles from "../../Styles/Services.module.css";
import _ from "lodash";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  updatePets,
  getPets,
  createService,
  getServices,
  deleteService,
} from "../../Axios/Hotel/Dashboard.js";
const Services = () => {
  const { hotel } = useSelector((state) => ({ ...state }));
  const [pets, setPets] = React.useState([]);
  const [originalPets, setOriginalPets] = React.useState([]);
  const [originalServices, setOriginalServices] = React.useState([]);
  const [newServices, setNewService] = React.useState({
    pet: "",
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    time: "",
    price: "",
    note: "",
  });
  //to add pets in hotel,

  const getPetsData = () => {
    getPets(hotel?.jwt)
      .then((res) => setOriginalPets(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    hotel && getPetsData();
  }, [hotel]);
  const getServicesData = () => {
    getServices(hotel?.jwt)
      .then((res) => setOriginalServices(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    hotel && getServicesData();
  }, [hotel]);
  const handlePets = (okay, petName) => {
    if (!okay) {
      //no need to do anything here
      // remove the pets from here
      let temp = pets;
      const index = temp.indexOf(petName);
      if (index !== -1) {
        temp.splice(index, 1);
        setPets(temp);
      }
      return;
    }
    let temp = pets;
    temp.push(petName);
    temp = _.uniq(temp);
    //now we have duplicate arrays
    setPets(temp);
  };
  const updatePetss = async () => {
    if (pets.length === 0) {
      toast("No Pet Selected for Update. Please Select 1 and Choose to Update");
      return;
    }
    updatePets(hotel?.jwt, pets)
      .then((res) => {
        toast.success("Pets Have been Updated!");
        getPetsData();
      })
      .catch((err) => console.log(err));
  };
  const tryChecked = (name) => {
    console.log(originalPets);
    let index = originalPets.indexOf(name);
    if (index >= 0) return true;
    return false;
  };

  //NEW SERVICE HANDLER
  const newServiceHandler = () => {
    //validate the form first
    if (newServices.pet === "") {
      toast.warning("Choose a Pet to Serve");
      return;
    }
    if (newServices.price === "") {
      toast.warning("Enter a Service Price");
      return;
    }

    if (newServices.time === "") {
      toast.warning("Choose a Time Duration of Service");
      return;
    }
    if (newServices.s1 === "") {
      toast.warning("Enter atleast a Service");
      return;
    }
    console.log(newServices);
    createService(hotel?.jwt, newServices)
      .then((res) => {
        toast.success("New Service has been Added Succesfully!");
        setNewService({
          pet: "",
          s1: "",
          s2: "",
          s3: "",
          s4: "",
          time: "",
          price: "",
          note: "",
        });
        getServicesData();
      })
      .catch((err) => toast.error(err.response.data));
  };
  const deleteServices = (id) => {
    console.log(id);
    deleteService(hotel?.jwt, id)
      .then((res) => {
        toast.success("Service Deleted Successfully");
        getServicesData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.addService}>
        <div className={styles.addService__title}>Add a Service</div>
        <div className={styles.addService__forms}>
          <div className={styles.addService__form}>
            <div className={styles.addService__formItem}>
              <div className={styles.addService__formItem__ask}>
                Service For
              </div>
              <div className={styles.addService__formItem__answer}>
                <select
                  name="cars"
                  id="cars"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setNewService({ ...newServices, pet: e.target.value })
                  }
                  value={newServices.pet}
                >
                  <option value={""}>---Choose a Pet---</option>
                  {originalPets &&
                    originalPets.length > 0 &&
                    originalPets.map((curr, index) => {
                      return (
                        <option value={curr} key={index}>
                          {curr}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className={styles.addService__formItem}>
              <div className={styles.addService__formItem__ask}>
                Service Time
              </div>
              <div className={styles.addService__formItem__answer}>
                <div className={styles.left}>
                  <input
                    type="number"
                    step="1"
                    onChange={(e) =>
                      setNewService({ ...newServices, time: e.target.value })
                    }
                    value={newServices.time}
                  />
                </div>
                <div className={styles.right}>Hours</div>
              </div>
            </div>
            <div className={styles.addService__formItem}>
              <div className={styles.addService__formItem__ask}>
                Service Price
              </div>
              <div className={styles.addService__formItem__answer}>
                <div className={styles.right1}>₹</div>
                <div className={styles.left1}>
                  <input
                    type="number"
                    step="1"
                    onChange={(e) =>
                      setNewService({ ...newServices, price: e.target.value })
                    }
                    value={newServices.price}
                  />
                </div>
              </div>
            </div>
            <div className={styles.addService__formItem}>
              <div className={styles.addService__formItem__ask}>Notes</div>
              <div className={styles.addService__formItem__answer}>
                <div className={styles.right1}>✏️</div>
                <div className={styles.left1}>
                  <input
                    type="text"
                    onChange={(e) =>
                      setNewService({ ...newServices, note: e.target.value })
                    }
                    value={newServices.note}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.addService__form}>
            <div className={styles.addService__formItem}>
              <div className={styles.addService__formItem__ask}>Services</div>
              <div className={styles.addService__formItem__answerr}>
                <div className={styles.left}>
                  <input
                    type="text"
                    placeholder="Eg: Feeding"
                    onChange={(e) =>
                      setNewService({ ...newServices, s1: e.target.value })
                    }
                    value={newServices.s1}
                  />
                </div>
                <br />
                <div className={styles.left}>
                  <input
                    type="text"
                    placeholder="Eg: Cleaning"
                    onChange={(e) =>
                      setNewService({ ...newServices, s2: e.target.value })
                    }
                    value={newServices.s2}
                    disabled={newServices.s1 === ""}
                  />
                </div>
                <br />
                <div className={styles.left}>
                  <input
                    type="text"
                    placeholder="Eg: Walking"
                    onChange={(e) =>
                      setNewService({ ...newServices, s3: e.target.value })
                    }
                    value={newServices.s3}
                    disabled={newServices.s2 === ""}
                  />
                </div>
                <br />
                <div className={styles.left}>
                  <input
                    type="text"
                    placeholder="Eg: Staying"
                    onChange={(e) =>
                      setNewService({ ...newServices, s4: e.target.value })
                    }
                    value={newServices.s4}
                    disabled={newServices.s3 === ""}
                  />
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
        <center>
          <button className={styles.addServiceBtn} onClick={newServiceHandler}>
            Add Service
          </button>
        </center>
      </div>
      {/*NEW ROW HERE*/}
      <div className={styles.availableServices}>
        <div className={styles.addService__title}>Allowed Pets</div>
        <div className={styles.availableServicesList}>
          <div className={styles.availableServices__Item}>
            <input
              type="checkbox"
              value="Rabbits"
              onChange={(e) => handlePets(e.target.checked, e.target.value)}
              defaultChecked={tryChecked("Rabbits")}
            />
            <label>Rabbits</label>
          </div>
          <div className={styles.availableServices__Item}>
            <input
              type="checkbox"
              value="Cats"
              defaultChecked={tryChecked("Rabbits")}
              onChange={(e) => handlePets(e.target.checked, e.target.value)}
            />
            <label>Cats</label>
          </div>
          <div className={styles.availableServices__Item}>
            <input
              type="checkbox"
              value="Dogs"
              onChange={(e) => handlePets(e.target.checked, e.target.value)}
              defaultChecked={tryChecked("Dogs")}
            />
            <label>Dogs</label>
          </div>
          <div className={styles.availableServices__Item}>
            <input
              type="checkbox"
              value="Fishes"
              onChange={(e) => handlePets(e.target.checked, e.target.value)}
              defaultChecked={tryChecked("Fishes")}
            />
            <label>Fishes</label>
          </div>
          <div className={styles.availableServices__Item}>
            <input
              type="checkbox"
              value="Birds"
              onChange={(e) => handlePets(e.target.checked, e.target.value)}
              defaultChecked={tryChecked("Birds")}
            />
            <label>Birds</label>
          </div>
        </div>
        <center>
          <br />{" "}
          <button className={styles.addServiceBtn} onClick={updatePetss}>
            Update
          </button>
        </center>
        <div className={styles.allowedlist}>Allowed Pets List</div>
        <ul>
          {originalPets &&
            originalPets.length > 0 &&
            originalPets.map((curr, el) => {
              return (
                <li key={el}>
                  <div className={styles.alloweditem}>{curr}</div>
                </li>
              );
            })}
        </ul>
      </div>

      <div className={styles.services}>
        <div className={styles.addService__title}>Service Offered</div>
        {originalServices.length > 0 && (
          <div className={styles.servicesList}>
            {originalServices.length > 0 &&
              originalServices.map((curr, index) => {
                return (
                  <div className={styles.service} key={index}>
                    <div className={styles.text}>
                      {curr?.servicesList.length > 0 &&
                        curr.servicesList.map((el, index) => {
                          return <span key={index}>{el} &emsp;</span>;
                        })}
                    </div>
                    <div className={styles.text}>For : {curr?.servicePet}</div>
                    <div className={styles.text}>
                      Service Charge : ₹{curr?.servicePrice}
                    </div>
                    <div className={styles.text}>
                      Service Duration : {curr?.serviceTime} hours
                    </div>

                    <div className={styles.text}>{curr?.serviceNote}</div>
                    <DeleteIcon
                      sx={{ color: "#f00", fontSize: 30, cursor: "pointer" }}
                      onClick={(e) => deleteServices(curr._id)}
                    />
                  </div>
                );
              })}
          </div>
        )}
        {originalServices.length === 0 && (
          <div className={styles.addService__title} style={{ fontSize: "16x" }}>
            No Service Created! Create One to Manage
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
