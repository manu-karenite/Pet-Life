import React from "react";
import con from "../../Assets/con1.jpeg";
import "../../Styles/Contact.css";
import { toast } from "react-toastify";
import { SendMessage } from "../../Axios/User/Authentication.js"

const Contact = () => {
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [name, setName] = React.useState("");
  const MsgSend = async (e) => {
    e.preventDefault();
    console.log(name, email, msg);
    SendMessage(name, email, msg)
      .then((res) => {
        toast(`Message Succesfully Sent! We will get back to you soon`);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${con})` }}
      ></div>
      <div className="rightSide">
        <h1> Contact Us</h1>

        <form id="contact-form" method="POST" onSubmit={MsgSend}>
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" onChange={(e) => setName(e.target.value)} value={name} />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            onChange={(e) => setMsg(e.target.value)} 
            value={msg}
            name="message"
            required
          ></textarea>
          <button type="submit"> Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
