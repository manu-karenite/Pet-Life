import { useEffect, useState } from "react";
import styles from "../../Styles/UserPages/Menu.module.css";

//MUI ICONS
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import { Switch, Pagination } from "antd";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import SearchIcon from "@mui/icons-material/Search";

import { getHotels } from "../../Axios/User/Dashboard.js";

//function to return number of stars in each row, taking parameter as how many stars

const Menu = () => {
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
            <RadioGroup>
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
            </RadioGroup>
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
                            src="https://res.cloudinary.com/pet-life/image/upload/v1646942669/i1mvjuwjayy4yugopset.jpg"
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
                            874 Plainfield Avenue, Cato
                          </div>
                          <div className={styles.starsList}>
                            <div>
                              <StarIcon
                                sx={{ color: "#f8d312", fontSize: 28 }}
                                style={{ cursor: "pointer" }}
                              />
                              <StarIcon
                                sx={{ color: "#f8d312", fontSize: 28 }}
                                style={{ cursor: "pointer" }}
                              />
                              <StarIcon
                                sx={{ color: "#f8d312", fontSize: 28 }}
                                style={{ cursor: "pointer" }}
                              />
                              <StarIcon
                                sx={{ color: "#f8d312", fontSize: 28 }}
                                style={{ cursor: "pointer" }}
                              />
                              <StarIcon
                                sx={{ color: "#f8d312", fontSize: 28 }}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            <div className={styles.review}>
                              {" "}
                              &emsp;(233 Reviews)
                            </div>
                          </div>
                          <div className={styles.categories}>
                            <span className={styles.category}>Cats</span>
                            <span className={styles.category}>Dogs</span>
                          </div>
                          <div className={styles.price}>
                            Starts ₹ 599/- Onwards
                          </div>
                          <div className={styles.buttons}>
                            <button className={styles.view}>View</button>
                            <button className={styles.bookNow}>Book</button>
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
