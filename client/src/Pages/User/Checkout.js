import React from "react";
import styles from "../../Styles/UserPages/Checkout.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getSavedItem } from "../../Axios/User/Checkout.js";
import { useSelector } from "react-redux";
import moment from "moment";
// import { RadioGroup, RadioButton } from "react-radio-buttons";
const Checkout = () => {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState(null);
  const [service, setService] = React.useState(null);
  const [door, setDoor] = React.useState(true);
  const [couponAmt, setCouponAmt] = React.useState(0);
  const [timeepoch, setTimeepoch] = React.useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  ); //default time of booking be after 24 hours
  const setServices = (data) => {
    const serviceId = data?.serviceId;
    for (let i = 0; i < data?.hotel?.services.length; i++) {
      let curr = data?.hotel?.services[i];
      if (curr?._id === serviceId) {
        setService(curr, serviceId);
        break;
      }
    }
  };
  const getData = () => {
    getSavedItem(user?.jwt)
      .then((res) => {
        setData(res.data);
        setServices(data);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    user && user.jwt && getData();
  }, [user]);
  return (
    <>
      <div className={styles.heading}>Confirm Your Booking</div>
      <div className={styles.divider}>
        <div className={styles.priceAndHotel}>
          <div className={styles.metaAndImage}>
            <div className={styles.address}>
              <div className={styles.bold1}>{data?.hotel?.name}</div>
              <div className={styles.add1}>
                {data?.hotel?.address?.data1 +
                  " " +
                  data?.hotel?.address?.data2}
              </div>
              <div className={styles.add1}>
                {data?.hotel?.address?.city +
                  " " +
                  data?.hotel?.address?.state +
                  " " +
                  data?.hotel?.address?.PIN}
              </div>
            </div>
            <div className={styles.address}>
              <img
                src={data?.hotel?.images[0]?.secure_url}
                className={styles.checkoutImage}
                alt="Hotel Piture"
              />
            </div>
          </div>

          <div className={styles.detailBooking}>
            {data?.hotel?.services &&
              data?.hotel?.services.map((curr, index) => {
                return (
                  curr?._id === data?.serviceId && (
                    <div className={styles.services} key={index}>
                      <div className={styles.servicesLeft}>
                        {curr?.servicePet} : {curr?.serviceTime} Hours X 1 Round
                      </div>
                      <div className={styles.servicesRight}>
                        {moment(timeepoch).format("MMMM Do YYYY, h:mm a")}
                      </div>
                    </div>
                  )
                );
              })}

            <div className={styles.transitMode}>Transit Mode</div>
          </div>
          {data?.hotel?.services &&
            data?.hotel?.services.map((curr, index) => {
              return (
                curr?._id === data?.serviceId && (
                  <div className={styles.priceBreakout} key={index}>
                    <div className={styles.priceHeading}>Price Breakout</div>
                    <div className={styles.price1}>
                      <div className={styles.priceAsk}>
                        Service Charge X 1 Slot
                      </div>
                      <div className={styles.priceAnswer}>
                        ₹ {Number(curr?.servicePrice).toFixed(2)}
                      </div>
                    </div>
                    <div className={styles.price1}>
                      <div className={styles.priceAsk}>Taxes @18%</div>
                      <div className={styles.priceAnswer}>
                        {" "}
                        + ₹ {Number(0.18 * curr?.servicePrice).toFixed(2)}
                      </div>
                    </div>
                    <div className={styles.price1}>
                      <div className={styles.priceAsk}>Home Pickup Charge</div>
                      <div className={styles.priceAnswer}>
                        {" "}
                        + ₹{" "}
                        {door ? Number(50).toFixed(2) : Number(0).toFixed(2)}
                      </div>
                    </div>
                    <br />
                    <div className={styles.price1}>
                      <div className={styles.priceAsk1}>Subtotal</div>
                      <div className={styles.priceAnswer1}>
                        ₹{" "}
                        {Number(
                          Number(curr?.servicePrice) +
                            Number(0.18 * curr?.servicePrice) +
                            Number(door ? 50.0 : 0.0)
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div className={styles.price1}>
                      <div className={styles.priceAsk}>Coupon Discount</div>
                      <div className={styles.priceAnswer}>
                        - ₹ {Number.parseInt(Number(couponAmt)).toFixed(2)}
                      </div>
                    </div>
                    <hr />
                    <div className={styles.price1}>
                      <div className={styles.priceAsk2}>Total</div>
                      <div className={styles.priceAnswer2}>
                        ₹{" "}
                        {Number(
                          Number(curr?.servicePrice) +
                            Number(0.18 * curr?.servicePrice) +
                            Number(door ? 50.0 : 0.0) -
                            Number(couponAmt)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                )
              );
            })}

          <div className={styles.priceButton}>
            <button>Pay Status &#8594;</button>
          </div>
        </div>
        <div className={styles.addressMeta}>
          <div className={styles.addressHead1}>Billing Address</div>
          <div className={styles.addressHead2}>
            * This should be same as Pickup Address, if opted for Home Pickup
            Service
          </div>
          <div>
            <form>
              <div>
                <input type="email" required placeholder="Your Email" />
              </div>
              <div className={styles.addressDivider}>
                <div>
                  <input type="text" required placeholder="Your Name" />
                </div>
                <div>
                  <input type="number" required placeholder="Your Contact" />
                </div>
              </div>
              <div>
                <input type="text" required placeholder="Your Address Line 1" />
              </div>
              <div>
                <input type="text" required placeholder="Your Address Line 2" />
              </div>
              <div className={styles.addressDivider}>
                <div>
                  <input type="text" required placeholder="Your PIN" />
                </div>
                <div>
                  <input type="number" required placeholder="Your City" />
                </div>
              </div>
              <div className={styles.addressDivider}>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your State"
                    readOnly={true}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    required
                    placeholder="India"
                    readOnly={true}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className={styles.selectPets}>
            <div className={styles.addressHead1}>Choose your Pet</div>
            <div>
              <div className={styles.radioButtonDiv}>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  defaultValue="huey"
                  defaultChecked
                />
                <label htmlFor="huey">Huey</label>
              </div>
              <div className={styles.radioButtonDiv}>
                <input
                  type="radio"
                  id="dewey"
                  name="drone"
                  defaultValue="dewey"
                />
                <label htmlFor="dewey">Dewey</label>
              </div>
              <div className={styles.radioButtonDiv}>
                <input
                  type="radio"
                  id="louie"
                  name="drone"
                  defaultValue="louie"
                />
                <label htmlFor="louie">Louie</label>
              </div>
            </div>
          </div>
          <br />
          <div className={styles.addressHead1}>Choose Booking Date</div>
          <Calendar />
          <br />
          <div className={styles.selectPets}>
            <div className={styles.addressHead1}>Choose Payment Method</div>
            <div>
              <div className={styles.radioButtonDiv}>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  defaultValue="huey"
                  defaultChecked
                />
                <label htmlFor="huey">UPI / Debit card / Credit card</label>
              </div>
              <div className={styles.radioButtonDiv}>
                <input
                  type="radio"
                  id="dewey"
                  name="drone"
                  defaultValue="dewey"
                />
                <label htmlFor="dewey">Pay On Pickup/Visit</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
