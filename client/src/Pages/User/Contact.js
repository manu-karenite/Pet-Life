import React from "react";
import con from "../../Assets/con1.jpeg";
import "../../Styles/Contact.css";
import { contactUs } from "../../Axios/User/Authentication.js";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
function Contact() {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [data, setData] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const formSubmitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(data);
    contactUs(data)
      .then((res) => {
        toast.success(
          "Email Has Been Sent Successfully! You will Get a Response Very Soon!"
        );
        setData({ name: "", data: "", email: "" });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };
  return (
    <>
      <Helmet>
        <title>PetLife | Contact Us</title>
      </Helmet>
      <div className="contact">
        <div
          className="leftSide"
          style={{ backgroundImage: `url(${con})` }}
        ></div>
        <div className="rightSide">
          <h1> Contact Us</h1>

          <form id="contact-form" onSubmit={formSubmitHandler}>
            <label htmlFor="name">Full Name</label>
            <input
              name="name"
              placeholder="Enter full name..."
              type="text"
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data?.name}
            />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              placeholder="Enter email..."
              type="email"
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data?.email}
            />
            <label htmlFor="message">Message</label>
            <textarea
              rows="6"
              placeholder="Enter message..."
              name="message"
              required
              onChange={(e) => setData({ ...data, data: e.target.value })}
              value={data?.data}
            ></textarea>
            <button type="submit" disabled={loading}>
              {loading ? <LoadingOutlined /> : "Send A Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
