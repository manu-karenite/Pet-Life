import React from "react";
import styles from "../../Styles/UserPages/Checkout.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import { RadioGroup, RadioButton } from "react-radio-buttons";
const Checkout = () => {
  return (
    <>
      <div className={styles.heading}>Confirm Your Booking</div>
      <div className={styles.divider}>
        <div className={styles.priceAndHotel}>
          <div className={styles.metaAndImage}>
            <div className={styles.address}>
              <div className={styles.bold1}>884 Sibanda Spurs Apt. 380, </div>
              <div className={styles.add1}>884 Sibanda Spurs Apt. 380,</div>
              <div className={styles.add1}>West Arnoldberg, Bilzen, 1507</div>
            </div>
            <div className={styles.address}>
              <img
                src="https://res.cloudinary.com/techbuy/image/upload/v1648820175/cat-g9ff46c1b5_1920_bdlbr0.jpg"
                alt="Checkout Page Images Here"
                className={styles.checkoutImage}
              />
            </div>
          </div>
          <div className={styles.detailBooking}>
            <div className={styles.services}>
              <div className={styles.servicesLeft}>Hello</div>
              <div className={styles.servicesRight}>Right</div>
            </div>
            <div className={styles.transitMode}>Transit Mode</div>
          </div>
          <div className={styles.priceBreakout}>
            <div className={styles.priceHeading}>Price Breakout</div>
            <div className={styles.price1}>
              <div className={styles.priceAsk}>Service Charge X 1 Slot</div>
              <div className={styles.priceAnswer}>₹ 1000.00</div>
            </div>
            <div className={styles.price1}>
              <div className={styles.priceAsk}>Taxes @18%</div>
              <div className={styles.priceAnswer}> + ₹180.00</div>
            </div>
            <div className={styles.price1}>
              <div className={styles.priceAsk}>Home Pickup Charge</div>
              <div className={styles.priceAnswer}> + ₹50.00</div>
            </div>
            <div className={styles.price1}>
              <div className={styles.priceAsk1}>Subtotal</div>
              <div className={styles.priceAnswer1}>₹ 1230.00</div>
            </div>
            <div className={styles.price1}>
              <div className={styles.priceAsk}>Coupon Discount</div>
              <div className={styles.priceAnswer}>- ₹500.00</div>
            </div>
            <hr />
            <div className={styles.price1}>
              <div className={styles.priceAsk2}>Total</div>
              <div className={styles.priceAnswer2}>₹ 730.00</div>
            </div>
          </div>
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
