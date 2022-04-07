import React from "react";
import styles from "../../Styles/UserPages/Checkout.module.css";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getSavedItem, createBooking } from "../../Axios/User/Checkout.js";
import { getPetDetails } from "../../Axios/User/Dashboard.js";
import { useSelector } from "react-redux";
import moment from "moment";
import { Collapse, Space } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { LoadingOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

// import { RadioGroup, RadioButton } from "react-radio-buttons";
const Checkout = () => {
  const [placing, setPlacing] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  const { user } = useSelector((state) => ({ ...state }));
  console.log("user", user?.email);
  const [form, setForm] = React.useState({
    email: user?.email,
    name: user?.name,
    contact: "",
    add1: "",
    add2: "",
    pin: "",
    city: "",
    state: "",
    country: "India",
  });
  const [keys, setKey] = React.useState([1, 0, 0, 0]);
  const [data, setData] = React.useState(null);
  const [service, setService] = React.useState(null);
  const [door, setDoor] = React.useState(true);
  const [couponAmt, setCouponAmt] = React.useState(0);
  const [activeCollapse, setActiveCollapse] = React.useState(1);
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
  //FOR CHECKING PIN DETAILS////////////////////////////////
  //for getiing my pet details////////////////////////////////////////////////////////////////
  const [petData, setPetData] = React.useState(null);
  const getPetData = () => {
    getPetDetails(user?.jwt)
      .then((res) => setPetData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    user && user.jwt && getPetData();
  }, [user]);
  const getPINDetails = async (pin) => {
    console.log(pin);
    console.log(pin.length);
    if (pin.length === 6) {
      const result = await axios({
        url: `https://api.postalpincode.in/pincode/${pin}`,
        method: "GET",
      });
      console.log(result);
      if (result.data[0]?.Status === "Success") {
        //get the first pin codec
        const area = result?.data[0]?.PostOffice[0];
        console.log(area);
        setForm({
          ...form,
          state: area.State,
          city: area.Block ? area.Block : area.Name,
          pin: area.Pincode,
        });
      } else {
        toast.warning("PIN Code Not Valid!");
      }
    } else {
      //we need to clear, it else matter ho jaayega

      setForm({ ...form, city: "", state: "", pin: pin });
    }
  };
  console.log(user);
  const completeStep1 = (e) => {
    e.preventDefault();
    console.log(form.contact.length);
    if (!form.email) {
      toast.warning("Please Enter Billing Email Address");
      return;
    }
    if (!form.name) {
      toast.warning("Please Enter Full Name");
      return;
    }
    if (!form.contact || form.contact.length != 10) {
      toast.warning("Please Enter 10 Digit Contact Number");
      return;
    }
    if (!form.add1) {
      toast.warning("Please Enter Your Address");
      return;
    }
    if (!form.pin) {
      toast.warning("Please Enter Your PIN Code");
      return;
    }
    if (!form.city) {
      toast.warning("Please Confirm your City");
      return;
    }
    if (!form.state) {
      toast.warning("Please Confirm your State");
      return;
    }
    //if we are here, it means everything is fine now.
    setActiveCollapse(2);
  };
  const completeStep3 = (e) => {
    e.preventDefault();
    setActiveCollapse(3);
  };

  //FOR STEP 3 : DATE HANDLER
  const [date, setDate] = React.useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  console.log(date);

  //FOR PAYMENT METHOD : SET
  const [pay, setPay] = React.useState("pay-on-visit");
  const completeStep4 = (e) => {
    e.preventDefault();
    setActiveCollapse(4);
  };

  //final Submitted
  const [readyToGo, setReadyToGo] = React.useState(false);
  const finalSubmit = (e) => {
    setReadyToGo(true);
  };
  const placeOrder = (e) => {
    e.preventDefault();
    setPlacing(true);
    console.log("FinalBook");
    //WHAT WE NEED?
    const object = {
      user: user?._id,
      hotel: data?.hotel?._id,
      serviceId: data?.serviceId,
      charge: door ? 50 : 0,
      form: form,
      pet: petData._id,
      paymentMethod: pay,
      slot: date,
    };
    console.log(object);
    createBooking(user?.jwt, object)
      .then((res) => {
        toast.success(
          "Booking Has Been Made Succesfully! Please Check Your Mail for Further Details"
        );
        setPlacing(false);
        navigate("/menu");
      })
      .catch((err) => {
        setPlacing(false);
        toast.error(err.response.data);
      });
  };

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
                        {moment(date).format("MMMM Do YYYY, h:mm a")}
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
                        {Number.parseInt(
                          Number(curr?.servicePrice) +
                            Number(0.18 * curr?.servicePrice) +
                            Number(door ? 50.0 : 0.0) -
                            Number(couponAmt)
                        )}
                      </div>
                    </div>
                  </div>
                )
              );
            })}

          {/* <div className={styles.priceButton}>
            <button disabled={!readyToGo}>Book &#8594;</button>
          </div> */}
        </div>

        <div className={styles.addressMeta}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Collapse
              collapsible={keys[0] ? "header" : "disabled"}
              defaultActiveKey={activeCollapse}
              activeKey={activeCollapse}
            >
              <Panel
                header={
                  <>
                    <div className={styles.addressHead1}>Billing Address</div>
                    <div className={styles.addressHead2}>
                      * This should be same as Pickup Address, if opted for Home
                      Pickup Service
                    </div>
                  </>
                }
                key="1"
              >
                <>
                  <div>
                    <form>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          value={form?.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                        />
                      </div>
                      <div className={styles.addressDivider}>
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={form?.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            required
                            placeholder="Your Contact"
                            value={form?.contact}
                            onChange={(e) =>
                              setForm({ ...form, contact: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Address Line 1"
                          value={form?.add1}
                          onChange={(e) =>
                            setForm({ ...form, add1: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Address Line 2"
                          value={form?.add2}
                          onChange={(e) =>
                            setForm({ ...form, add2: e.target.value })
                          }
                        />
                      </div>
                      <div className={styles.addressDivider}>
                        <div>
                          <input
                            type="number"
                            required
                            placeholder="Your PIN"
                            value={form?.pin}
                            onChange={(e) => {
                              setForm({ ...form, pin: e.target.value });
                              getPINDetails(e.target.value);
                            }}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Your City"
                            value={form?.city}
                            onChange={(e) =>
                              setForm({ ...form, city: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className={styles.addressDivider}>
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Your State"
                            readOnly={true}
                            value={form?.state}
                            onChange={(e) =>
                              setForm({ ...form, state: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="India"
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <input
                        type="submit"
                        value="Proceed to Next Step"
                        onClick={(e) => completeStep1(e)}
                        className={styles.stepsButton}
                      />
                    </form>
                  </div>
                </>
              </Panel>
              <Panel
                header={
                  <div className={styles.addressHead1}>Choose your Pet</div>
                }
                key="2"
              >
                <div className={styles.selectPets}>
                  <div>
                    {petData && (
                      <div className={styles.radioButtonDiv}>
                        <input
                          type="radio"
                          id={petData?._id}
                          name="drone"
                          defaultValue={petData?._id}
                          defaultChecked
                          value={petData?._id}
                        />
                        <label htmlFor={petData?._id}>
                          {petData?.nickname} ({petData?.category} :
                          {petData?.age} months old)
                        </label>
                      </div>
                    )}
                  </div>
                  <button
                    className={styles.stepsButton}
                    disabled={petData === null}
                    onClick={(e) => completeStep3(e)}
                  >
                    Proceed to Next Step
                  </button>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={styles.addressHead1}>Choose Booking Slot</div>
                }
                key="3"
              >
                <DateTimePicker onChange={setDate} value={date} />
                <div>
                  <button
                    className={styles.stepsButton}
                    onClick={(e) => completeStep4(e)}
                  >
                    Proceed to Next Step
                  </button>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={styles.addressHead1}>
                    {" "}
                    Choose Payment Method
                  </div>
                }
                key="4"
              >
                <div className={styles.selectPets}>
                  <div>
                    {/* <div className={styles.radioButtonDiv}>
                      <input
                        type="radio"
                        id="huey"
                        name="drone"
                        defaultValue="huey"
                        defaultChecked
                      />
                      <label htmlFor="huey">
                        UPI / Debit card / Credit card
                      </label>
                    </div> */}
                    <div className={styles.radioButtonDiv}>
                      <input
                        type="radio"
                        id="pay-on-delivery"
                        name="drone"
                        defaultValue="pay-on-delivery"
                        defaultChecked
                      />
                      <label htmlFor="pay-on-delivery">
                        Pay On Pickup/Visit
                      </label>
                    </div>
                  </div>
                  <div>
                    <button
                      className={styles.finalButton}
                      onClick={placeOrder}
                      disabled={placing}
                    >
                      {placing ? (
                        <LoadingOutlined style={{ fontSize: 30 }} />
                      ) : (
                        "Proceed to Book"
                      )}
                    </button>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </Space>
        </div>
      </div>
    </>
  );
};

export default Checkout;
