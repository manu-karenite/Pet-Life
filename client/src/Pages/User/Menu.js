import { useEffect, useState } from "react";
import styles from "../../Styles/UserPages/Menu.module.css";
import { useNavigate } from "react-router-dom";
//MUI ICONS
import StarRatings from "react-star-ratings";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import { Switch, Pagination } from "antd";
// import { RadioGroup, RadioButton } from "react-radio-buttons";
import SearchIcon from "@mui/icons-material/Search";

import { getHotels } from "../../Axios/User/Dashboard.js";

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
  const navigate = useNavigate();
  const [allHotels, setAllHotels] = useState([]);
  const [search, setSearch] = useState("");
  const getDataOfHotels = () => {
    getHotels()
      .then((res) => setAllHotels(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDataOfHotels();
  }, []);
  return (
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
              <div>
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
              <div>
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
              <div>
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
              <div>
                <StarIcon
                  sx={{ color: "#f8d312", fontSize: 34 }}
                  style={{ cursor: "pointer" }}
                />
                <StarIcon
                  sx={{ color: "#f8d312", fontSize: 34 }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div>
                <StarIcon
                  sx={{ color: "#f8d312", fontSize: 34 }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <hr />
            <div className={styles.drawerSubTitle}>Find your Pet</div>
            <div>
              <div className={styles.checkboxes}>
                <input type="checkbox" id="cats" name="cats" />
                <label htmlFor="cats">Cats</label>
              </div>
              <div className={styles.checkboxes}>
                <input type="checkbox" id="dogs" name="dogs" />
                <label htmlFor="dogs">Dogs</label>
              </div>
              <div className={styles.checkboxes}>
                <input type="checkbox" id="fished" name="fished" />
                <label htmlFor="fished">Fishes</label>
              </div>
              <div className={styles.checkboxes}>
                <input
                  type="checkbox"
                  id="birds"
                  name="birds"
                  className={styles.cb}
                />
                <label htmlFor="birds">Birds</label>
              </div>
              <div className={styles.checkboxes}>
                <input type="checkbox" id="rabbits" name="rabbits" />
                <label htmlFor="rabbits">Rabbits</label>
              </div>
            </div>
            <hr />
            <div className={styles.drawerSubTitle}>Home Pickup</div>
            <Switch defaultChecked />
            <hr />
            <div className={styles.drawerSubTitle}>Top Cities</div>
            {/* <RadioGroup>
              <RadioButton
                value="apple"
                iconSize={20}
                iconInnerSize={10}
                pointColor="#ff4242"
                padding={8}
              >
                <span
                  style={{
                    color: "#ff4242",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Kochi
                </span>
              </RadioButton>
              <RadioButton
                value="orange"
                iconSize={20}
                iconInnerSize={10}
                pointColor="#ff4242"
                padding={8}
              >
                <span
                  style={{
                    color: "#ff4242",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Trivandrum
                </span>
              </RadioButton>
              <RadioButton
                value="melon"
                iconSize={20}
                iconInnerSize={10}
                padding={8}
                pointColor="#ff4242"
              >
                <span
                  style={{
                    color: "#ff4242",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Kozhikode
                </span>
              </RadioButton>
              <RadioButton
                value="melon"
                iconSize={20}
                iconInnerSize={10}
                pointColor="#ff4242"
                padding={8}
              >
                <span
                  style={{
                    color: "#ff4242",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Coimbatore
                </span>
              </RadioButton>
              <RadioButton
                value="melon"
                iconSize={20}
                iconInnerSize={10}
                pointColor="#ff4242"
                padding={8}
              >
                <span
                  style={{
                    color: "#ff4242",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Bengaluru
                </span>
              </RadioButton>
              <RadioButton
                value="melon"
                iconSize={20}
                iconInnerSize={10}
                pointColor="#ff4242"
                padding={8}
              >
                <span
                  style={{
                    color: "#ff4242",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Mysore
                </span>
              </RadioButton>
            </RadioGroup> */}
          </div>
          <div className={styles.hotels}>
            <div className={styles.searchBar}>
              <div>
                <input
                  type="text"
                  className={styles.searchField}
                  placeholder="Search by Location, or Pets"
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
              {allHotels &&
                allHotels.length > 0 &&
                allHotels.map((curr, index) => {
                  return (
                    curr?.name.includes(search) && (
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
                            <div className={styles.hotelShare}>
                              <ShareIcon style={{ cursor: "pointer" }} />
                            </div>
                          </div>
                          <div className={styles.hotelAddress}>
                            {curr?.address?.data1 + " " + curr?.address?.data2}
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
                              &emsp; ({" "}
                              {curr?.numberOfRatings
                                ? curr?.numberOfRatings
                                : 0}{" "}
                              Reviews)
                            </div>
                          </div>
                          <div className={styles.categories}>
                            {curr &&
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
                              })}
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
            <div className={styles.pagination}>
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
