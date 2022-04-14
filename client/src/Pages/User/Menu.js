import { useEffect, useState } from "react";
import styles from "../../Styles/UserPages/Menu.module.css";
import { useNavigate } from "react-router-dom";
//MUI ICONS
import _ from "lodash";
import StarRatings from "react-star-ratings";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import { Switch, Pagination } from "antd";
// import { RadioGroup, RadioButton } from "react-radio-buttons";
import SearchIcon from "@mui/icons-material/Search";
import { Helmet } from "react-helmet";
import { getHotels } from "../../Axios/User/Dashboard.js";
import { ClockCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
//function to return number of stars in each row, taking parameter as how many stars
const getStaringPrice = (el) => {
  let minimumCost = Number.MAX_SAFE_INTEGER;
  let array = el?.services;
  if (!array || array.length === 0) {
    return;
  }
  for (let i = 0; i < array.length; i++) {
    minimumCost = Math.min(minimumCost, array[i]?.servicePrice);
  }
  return minimumCost;
};
const Menu = () => {
  useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [allHotels, setAllHotels] = useState([]);
  const [search, setSearch] = useState("");
  const getDataOfHotels = () => {
    setLoad(true);
    getHotels()
      .then((res) => {
        setAllHotels(res.data);
        setLoad(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoad(false);
      });
  };
  useEffect(() => {
    getDataOfHotels();
  }, []);
  const getPetsAvailableForServices = (data) => {
    const mySet1 = new Set();
    for (let i = 0; i < data?.services.length; i++) {
      mySet1.add(data?.services[i]?.servicePet);
    }
    return Array.from(mySet1);
  };
  //for checkbox related filtering.......
  const [petsFull, setPetsFull] = useState([
    "Rabbits",
    "Dogs",
    "Cats",
    "Birds",
    "Fishes",
  ]);
  const createCheckboxArray = (checked, name) => {
    let x = petsFull;
    if (checked === false) {
      let y = x.indexOf(name);
      console.log(y);
      if (y !== -1) {
        x = x.filter((curr, index) => curr !== name);
        setPetsFull(x);
      }
    } else {
      x.push(name);
      x = _.uniq(x);
      setPetsFull(x);
    }
  };
  //for stars related filtering
  const [filterStar, setFilterStar] = useState(0);
  const checkBoxCleared = (curr) => {
    for (let i = 0; i < curr?.services.length; i++) {
      if (petsFull.indexOf(curr?.services[i]?.servicePet) !== -1) {
        return true;
      }
    }

    return false;
  };

  //for states radio buttons > 1
  const [state, setState] = useState("");
  return (
    <>
      <Helmet>
        <title>PetLife | Menu</title>
      </Helmet>
      <div className="container-fluid">
        <div className="row">
          <div className={styles.menuWrap}>
            <div className={styles.drawer}>
              <div className={styles.drawerTitle}>
                Filter <FilterAltIcon sx={{ fontSize: 30 }} />
              </div>
              <hr />
              <div className={styles.drawerSubTitle}>Star Ratings </div>
              <div className={styles.stars}>
                <div onClick={(e) => setFilterStar(5)}>
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div onClick={(e) => setFilterStar(4)}>
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div onClick={(e) => setFilterStar(3)}>
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div onClick={(e) => setFilterStar(2)}>
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div onClick={(e) => setFilterStar(1)}>
                  <StarIcon
                    sx={{ color: "#f8d312", fontSize: 34 }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div
                  onClick={(e) => setFilterStar(0)}
                  style={{
                    fontFamily: "Rubik",
                    backgroundColor: "#000000",
                    color: "white",
                    display: "inline-block",
                    border: "1px #f8d312 solid",
                    borderRadius: "6px",
                    padding: "2px 5px",
                  }}
                >
                  Clear Star Filter
                </div>
              </div>
              <hr />
              <div className={styles.drawerSubTitle}>Find your Pet</div>
              <div>
                <div className={styles.checkboxes}>
                  <input
                    type="checkbox"
                    id="cats"
                    name="Cats"
                    onClick={(e) =>
                      createCheckboxArray(e.target.checked, e.target.name)
                    }
                    checked={petsFull.indexOf("Cats") !== -1}
                  />
                  <label htmlFor="cats">Cats</label>
                </div>
                <div className={styles.checkboxes}>
                  <input
                    type="checkbox"
                    id="dogs"
                    name="Dogs"
                    onClick={(e) =>
                      createCheckboxArray(e.target.checked, e.target.name)
                    }
                    checked={petsFull.indexOf("Dogs") !== -1}
                  />
                  <label htmlFor="dogs">Dogs</label>
                </div>
                <div className={styles.checkboxes}>
                  <input
                    type="checkbox"
                    id="fished"
                    name="Fishes"
                    onClick={(e) =>
                      createCheckboxArray(e.target.checked, e.target.name)
                    }
                    checked={petsFull.indexOf("Fishes") !== -1}
                  />
                  <label htmlFor="fished">Fishes</label>
                </div>
                <div className={styles.checkboxes}>
                  <input
                    type="checkbox"
                    id="birds"
                    name="Birds"
                    className={styles.cb}
                    onClick={(e) =>
                      createCheckboxArray(e.target.checked, e.target.name)
                    }
                    checked={petsFull.indexOf("Birds") !== -1}
                  />
                  <label htmlFor="birds">Birds</label>
                </div>
                <div className={styles.checkboxes}>
                  <input
                    type="checkbox"
                    id="rabbits"
                    name="Rabbits"
                    onClick={(e) =>
                      createCheckboxArray(e.target.checked, e.target.name)
                    }
                    checked={petsFull.indexOf("Rabbits") !== -1}
                  />
                  <label htmlFor="rabbits">Rabbits</label>
                </div>
                <div className={styles.checkboxes}>
                  <input
                    type="checkbox"
                    id="rabbits"
                    name="All"
                    onClick={(e) =>
                      setPetsFull([
                        "Rabbits",
                        "Dogs",
                        "Cats",
                        "Birds",
                        "Fishes",
                      ])
                    }
                  />
                  <label htmlFor="rabbits">All</label>
                </div>
              </div>
              <hr />
              {/* <div className={styles.drawerSubTitle}>Home Pickup</div>
            <Switch defaultChecked />
            <hr /> */}

              <div className={styles.drawerSubTitle}>Top Serving States</div>
              <div>
                <div>
                  <input
                    type="radio"
                    id="huey"
                    name="Cities"
                    value="Kerala"
                    onClick={(e) => setState(e.target.value)}
                  />
                  <label htmlFor="huey">Kerala</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="huey"
                    name="Cities"
                    value="Maharashtra"
                    onClick={(e) => setState(e.target.value)}
                  />
                  <label htmlFor="huey">Maharashtra</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="huey"
                    name="Cities"
                    value="Delhi"
                    onClick={(e) => setState(e.target.value)}
                  />
                  <label htmlFor="huey">Delhi</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="huey"
                    name="Cities"
                    value="Bihar"
                    onClick={(e) => setState(e.target.value)}
                  />
                  <label htmlFor="huey">Bihar</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="huey"
                    name="Cities"
                    value="Karnataka"
                    onClick={(e) => setState(e.target.value)}
                  />
                  <label htmlFor="huey">Karnataka</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="huey"
                    name="Cities"
                    value=""
                    onClick={(e) => setState(e.target.value)}
                    checked={state === ""}
                  />
                  <label htmlFor="huey">All</label>
                </div>
              </div>
            </div>
            <div className={styles.hotels}>
              <div className={styles.searchBar}>
                <div className={styles.xxx}>
                  <input
                    type="text"
                    className={styles.searchField}
                    placeholder="Search by Hotel Name"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                  <button className={styles.searchButton}>
                    <SearchIcon sx={{ color: "#fff" }} />
                  </button>
                </div>
              </div>
              <div className={styles.drawerSubTitle}>Our Curated Hotels </div>

              <div className={styles.hotelList}>
                {load && (
                  <center>
                    <br />
                    <br />
                    <ClockCircleOutlined
                      spin={true}
                      style={{ fontSize: 70, color: "black" }}
                    />
                  </center>
                )}
                {!load &&
                  allHotels &&
                  allHotels.length > 0 &&
                  allHotels.map((curr, index) => {
                    return (
                      curr?.name.toLowerCase().includes(search.toLowerCase()) &&
                      (curr?.starRating ? curr.starRating : 0) >= filterStar &&
                      checkBoxCleared(curr) &&
                      (state === "" || curr?.address?.state === state) &&
                      curr?.status === "Active" && (
                        <div className={styles.hotel} key={index}>
                          <div className={styles.hotelImage}>
                            <img
                              src={curr?.images[0]?.secure_url}
                              alt="hotel"
                              className={styles.hotelImg}
                            />
                          </div>

                          <div className={styles.hotelMeta}>
                            <div className={styles.hotelTitleAndShare}>
                              <div className={styles.hotelTitle}>
                                {curr?.name}
                              </div>
                              {/* <div className={styles.hotelShare}>
                              <ShareIcon style={{ cursor: "pointer" }} />
                            </div> */}
                            </div>
                            <div className={styles.hotelAddress}>
                              {curr?.address?.data1 +
                                " " +
                                curr?.address?.data2}
                            </div>
                            <div className={styles.hotelAddress}>
                              {curr?.address?.city +
                                " " +
                                curr?.address?.state +
                                " " +
                                curr?.address?.PIN}
                            </div>
                            <div className={styles.starsList}>
                              <div>
                                <StarRatings
                                  rating={Number(
                                    curr?.starRating ? curr?.starRating : 0
                                  )}
                                  starRatedColor="#fccc4d"
                                  numberOfStars={5}
                                  svgIconPath="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                                  starDimension="20px"
                                  starSpacing="5px"
                                />
                              </div>
                              <div className={styles.review}>
                                &emsp; (
                                {curr?.numberOfRatings
                                  ? curr?.numberOfRatings
                                  : 0}{" "}
                                Reviews)
                              </div>
                            </div>
                            <div className={styles.categories}>
                              {/* {curr &&
                              curr.petsAllowed &&
                              curr.petsAllowed.length > 0 &&
                              curr.petsAllowed.map((curr1, index1) => {
                                return (
                                  <span
                                    className={styles.category}
                                    key={index1}
                                  >
                                    {curr1}
                                  </span>
                                );
                              })} */}
                              {getPetsAvailableForServices(curr).map(
                                (curr1, index1) => {
                                  return (
                                    <span
                                      className={styles.category}
                                      key={index1}
                                    >
                                      {curr1}
                                    </span>
                                  );
                                }
                              )}
                            </div>
                            <div className={styles.price}>
                              Starts ₹ {getStaringPrice(curr)}/- Onwards
                            </div>
                            <div className={styles.buttons}>
                              <button
                                className={styles.view}
                                onClick={(e) =>
                                  navigate(`/menu/hotel/${curr?._id}`)
                                }
                              >
                                View
                              </button>
                              {/* <button className={styles.bookNow}>Book</button> */}
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
              {/* <div className={styles.pagination}>
              <Pagination defaultCurrent={1} total={50} />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
