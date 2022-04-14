import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getIndividualHotel,
  getMoreHotelDetails,
  getReviewsHotelWise,
} from "../../Axios/User/Dashboard.js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { addReview } from "../../Axios/User/Dashboard.js";
import { createCheckout } from "../../Axios/User/Checkout.js";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../Styles/UserPages/HotelIndividual.module.css";
import { getAnImage } from "../../StaticFiles/PetImages.js";
import StarRatings from "react-star-ratings";
import { Progress } from "antd";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import { toast } from "react-toastify";
import moment from "moment";
import { Helmet } from "react-helmet";
function createMarkup(text) {
  return { __html: text };
}
const HotelIndividual = () => {
  const [load, setLoad] = React.useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const params = useParams();
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, [params]);
  const [hotel, setHotel] = React.useState(null);
  const [rev, setRev] = React.useState([]);
  const getReviews = () => {
    getReviewsHotelWise(params?.hotelId)
      .then((res) => setRev(res.data))
      .catch((err) => toast("Reviews Could not be fetched!"));
  };
  const getData = () => {
    getIndividualHotel(params?.hotelId)
      .then((res) => setHotel(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
    getReviews();
  }, [params]);
  const [otherHotels, setOtherHotels] = React.useState([]);
  const getOther = () => {
    getMoreHotelDetails(params?.hotelId)
      .then((res) => setOtherHotels(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getOther();
  }, [params]);

  //FOR Checkout
  const handleCheckout = (serviceId, hotelId) => {
    console.log(serviceId, hotelId);
    if (!user) {
      toast.warning("Please Login to Book A Hotel!");
      navigate("/login");
      return;
    }
    //first send the data to backend..
    const data = {
      user: user._id,
      hotel: params.hotelId,
      serviceId,
    };
    createCheckout(data, user?.jwt)
      .then((res) => navigate("/checkout"))
      .catch((err) => console.log(err));
  };

  //for reviews..........
  const [reviewText, setReviewText] = React.useState("");
  const [star, setStar] = React.useState(0);
  const changeRating = (value) => {
    console.log(value);
  };
  const reviewHandler = (e) => {
    if (!user) {
      toast.warning("Please Login to Review Hotels and Book");
      return;
    }
    if (star === 0) {
      toast.warning("Please Choose a Minimum Rating 1 to Rate the Pet Hotel");
      return;
    }
    if (reviewText === "") {
      toast.warning("Please Review a Few Words Before Saving");
      return;
    }
    //Now, we have the user................................................................
    setLoad(true);
    addReview(user?.jwt, {
      hotelId: params?.hotelId,
      user: user?._id,
      review: reviewText,
      star: star,
    })
      .then((res) => {
        toast.success("Review has been added successfully");
        getData();
        getReviews();
        setLoad(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoad(false);
      });
  };
  //now get the reviewMarks
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;

  for (let i = 0; i < rev?.length; i++) {
    const rate = rev[i].star;
    if (rate === 1) one++;
    if (rate === 2) two++;
    if (rate === 3) three++;
    if (rate === 4) four++;
    if (rate === 5) five++;
  }
  let avg = 0;
  if (rev.length === 0) {
    avg = 0;
  } else {
    avg = one * 1 + two * 2 + three * 3 + five * 5 + four * 4;
    avg = (avg / rev.length).toFixed(1);
  }
  return (
    <>
      <Helmet>
        <title>PetLife | {String(hotel?.name)}</title>
      </Helmet>
      <div>
        {/* <div className={styles.bannerDiv}> */}
        <Carousel
          autoPlay={true}
          // centerMode={true}
          niteLoop={true}
          Arrows={true}
          showThumbs={false}
          style={{ height: "65vh" }}
        >
          <div>
            <img
              src={hotel?.images[0]?.secure_url}
              alt="Hotel Images"
              className={styles.banner}
            />
          </div>
          <div>
            <img
              src={hotel?.images[1]?.secure_url}
              alt="Hotel Images"
              className={styles.banner}
              id="hello"
            />
          </div>
        </Carousel>
        {/* <div> */}
        {/* <img
          src={hotel?.images[0]?.secure_url}
          alt="Hotel Images"
          className={styles.banner}
        /> */}
        {/* </div> */}
        {/* <div> */}
        {/* <img
          src={hotel?.images[1]?.secure_url}
          alt="Hotel Images"
          className={styles.banner}
          id="hello"
        /> */}
        {/* </div> */}
        {/* </div> */}
        {/* DIVIDING THE AREA INTO TWO PARTS */}
        <div className={styles.divider}>
          <div className={styles.left}>
            <div className={styles.left_title}>{hotel?.name.toUpperCase()}</div>
            <div className={styles.left_address}>
              <LocationOnIcon /> :{" "}
              {hotel?.address?.data1 + " , " + hotel?.address?.data2}
            </div>
            <div className={styles.left_address}>
              <MapIcon /> :{" "}
              {hotel?.address?.city +
                " , " +
                hotel?.address?.state +
                " , " +
                hotel?.address?.PIN}
            </div>
            <div className={styles.left_address}>
              <MailIcon /> : {hotel?.email}
            </div>
            <div className={styles.left_address}>
              <LocalPhoneIcon /> : {"+91 " + hotel?.contact}
            </div>
            <div>
              <div className={styles.left_best_title}>Best In The City for</div>
              <div className={styles.best_cards}>
                {hotel &&
                  hotel?.petsAllowed &&
                  hotel.petsAllowed.length > 0 &&
                  hotel.petsAllowed.map((Curr, index) => {
                    return (
                      <span className={styles.best_card} key={index}>
                        {Curr}
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className={styles.left_description}>
              <div className={styles.left_best_title}>Description</div>
              <br />
              <div
                className={styles.left_address}
                dangerouslySetInnerHTML={createMarkup(hotel?.description)}
              ></div>
            </div>

            <div className={styles.left_best_title}>
              What Customers Have to Say!
            </div>
            <hr />
            <div className={styles.reviews_stars}>
              <div className={styles.stars}>
                <div className={styles.averageStars}>{avg}</div>
                <div className={styles.starsTotal}>
                  <StarRatings
                    rating={Number(
                      hotel?.starRating ? hotel.starRating.toFixed(1) : 0
                    )}
                    starRatedColor="#fccc4d"
                    numberOfStars={5}
                    svgIconPath="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                  />
                </div>
                <div className={styles.singleStar}>
                  <div className={styles.singleStarItem}>
                    <div className={styles.singleStarItemCount}>1 Star</div>
                    <div className={styles.singleStarItemTable}>
                      <Progress
                        percent={(
                          (one / (rev.length ? rev.length : 1)) *
                          100
                        ).toFixed(1)}
                        strokeColor="#fccc4d"
                      />
                    </div>
                  </div>
                  <div className={styles.singleStarItem}>
                    <div className={styles.singleStarItemCount}>2 Stars</div>
                    <div className={styles.singleStarItemTable}>
                      <Progress
                        percent={(
                          (two / (rev.length ? rev.length : 1)) *
                          100
                        ).toFixed(1)}
                        strokeColor="#fccc4d"
                      />
                    </div>
                  </div>
                  <div className={styles.singleStarItem}>
                    <div className={styles.singleStarItemCount}>3 Stars</div>
                    <div className={styles.singleStarItemTable}>
                      <Progress
                        percent={(
                          (three / (rev.length ? rev.length : 1)) *
                          100
                        ).toFixed(1)}
                        strokeColor="#fccc4d"
                      />
                    </div>
                  </div>
                  <div className={styles.singleStarItem}>
                    <div className={styles.singleStarItemCount}>4 Stars</div>
                    <div className={styles.singleStarItemTable}>
                      <Progress
                        percent={(
                          (four / (rev.length ? rev.length : 1)) *
                          100
                        ).toFixed(1)}
                        strokeColor="#fccc4d"
                      />
                    </div>
                  </div>
                  <div className={styles.singleStarItem}>
                    <div className={styles.singleStarItemCount}>5 Stars</div>
                    <div className={styles.singleStarItemTable}>
                      <Progress
                        percent={(
                          (five / (rev.length ? rev.length : 1)) *
                          100
                        ).toFixed(1)}
                        strokeColor="#fccc4d"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.reviewBox}>Add Your Review</div>
                <div className={styles.rateUs}>
                  <div className={styles.starRate}>
                    <StarRatings
                      rating={star}
                      starRatedColor="#fccc4d"
                      numberOfStars={5}
                      name="rating"
                      svgIconPath="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                      starDimension="40px"
                      starHoverColor="#0000ff"
                      isSelectable={true}
                      changeRating={(value) => setStar(value)}
                    />
                  </div>
                  <div className={styles.text}>
                    <input
                      type="text"
                      className={styles.textInput}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Add a Review"
                      value={reviewText}
                    />
                  </div>
                  <div className={styles.btnReview}>
                    <button
                      className={styles.addToCart}
                      onClick={reviewHandler}
                      disabled={load}
                    >
                      {load ? "Please Wait" : "POST"}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.reviews}>
                <div className={styles.reviewBox}>Reviews</div>
                {rev &&
                  rev.length > 0 &&
                  rev.map((curr, index) => {
                    return (
                      <div className={styles.reviewsSection}>
                        <div className={styles.review}>
                          <span className={styles.reviewPerson}>
                            {curr?.user?.name}
                          </span>
                          <span className={styles.date}>
                            {moment(curr?.createdAt).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                          </span>
                        </div>
                        <div className={styles.reviewStars}>
                          <StarRatings
                            rating={curr?.star}
                            starRatedColor="#fccc4d"
                            // changeRating={this.changeRating}
                            numberOfStars={5}
                            name="rating"
                            svgIconPath="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                            starDimension="18px"
                            starSpacing="5px"
                          />
                        </div>
                        <div className={styles.reviewText}>{curr?.comment}</div>
                      </div>
                    );
                  })}
                {rev && rev.length === 0 && (
                  <p>No Review Yet! Be The First One to Review</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.right_services}>
              {hotel?.services &&
                hotel?.services.length > 0 &&
                hotel?.services.map((curr, index) => {
                  return (
                    <div className={styles.service} key={index}>
                      <div className={styles.service_meta}>
                        <div className={styles.service_meta_textContent}>
                          <div
                            className={styles.service_meta_textContent_services}
                          >
                            {curr?.servicesList &&
                              curr?.servicesList.length > 0 &&
                              curr.servicesList.map((curr, index) => {
                                return <span key={index}>{curr} | </span>;
                              })}
                          </div>

                          <span
                            className={styles.service_meta_textContent_time}
                          >
                            {curr?.serviceTime} Hours
                          </span>

                          <div className={styles.service_meta_textContent_cost}>
                            ₹ {curr?.servicePrice} /- (excludes Taxes)
                          </div>
                        </div>
                        <div className={styles.service_meta_imageOfPet}>
                          <img
                            src={getAnImage(curr?.servicePet)}
                            alt="Pet Images"
                            className={styles.serviceImage}
                          />
                        </div>
                      </div>
                      <div className={styles.service_btn}>
                        <button
                          onClick={(e) => handleCheckout(curr._id, hotel?._id)}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={styles.left_more}>
          <div className={styles.left_more_title}>
            You May Want to Explore More
          </div>
          <div className={styles.left_moreHotels}>
            {otherHotels.length > 0 &&
              otherHotels.map((Curr, index) => {
                return (
                  <div className={styles.left_moreHotel} key={index}>
                    <div>
                      <img
                        src={Curr?.images[0]?.secure_url}
                        className={styles.moreImage}
                        alt={Curr._id}
                      />
                    </div>

                    <div className={styles.left_moreMetaData}>
                      <div>
                        <div className={styles.left_moreMetaData_title}>
                          {Curr?.name}
                        </div>
                        <div
                          className={styles.left_address}
                          style={{ fontSize: "16px" }}
                        >
                          {Curr?.address?.data1}
                        </div>
                        <div
                          className={styles.left_address}
                          style={{ fontSize: "16px" }}
                        >
                          {Curr?.address?.data2}
                        </div>
                        <div
                          className={styles.left_address}
                          style={{ fontSize: "16px" }}
                        >
                          {Curr?.address?.city +
                            " , " +
                            Curr?.address?.state +
                            " , " +
                            Curr?.address?.PIN}
                        </div>
                      </div>
                      <button
                        onClick={(e) => navigate(`/menu/hotel/${Curr?._id}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelIndividual;
