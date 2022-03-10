import React, { useState, useEffect } from "react";
import styles from "../../Styles/HotelProfile.module.css";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getProfile, updateProfile } from "../../Axios/Hotel/Dashboard.js";
import { toast } from "react-toastify";
const Profile = () => {
  const { hotel } = useSelector((state) => ({ ...state }));
  const [shortDesc, setShortDesc] = useState(
    "Enter your Short Description of Hotel"
  );
  const [desc, setDesc] = useState("Enter your Description of Hotel");
  const [data, setData] = useState({
    email: hotel?.email,
    contact: hotel?.contact,
    name: hotel?.name,
  });
  const getData = () => {
    getProfile(hotel?.jwt, hotel?._id)
      .then((res) => {
        //setHere
        console.log(res.data);
        setDesc(res.data.description);
        setShortDesc(res.data.shortDescription);
        setData({
          ...data,
          address1: res.data.address1,
          address2: res.data.address2,
          city: res.data.city,
          landmark: res.data.landmark,
          state: res.data.state,
          pin: res.data.pin,
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [hotel]);
  const submitHandler = (e) => {
    e.preventDefault();
    //create a final Object
    const object = {
      ...data,
      desc: desc,
      shortDesc: shortDesc,
      name: hotel?.name,
      email: hotel?.email,
      contact: hotel?.contact,
    };
    updateProfile(hotel?.jwt, object)
      .then((res) => {
        toast.success("Profile has been updated succesfully!");
        getData();
      })
      .catch((err) => toast.error(err.response.data));
  };
  return (
    <>
      <div className={`container-fluid ${styles.profileOuter}`}>
        <div className="row">
          <div className="col-md-2"></div>
          <div className={`col-md-8`}>
            <div className={styles.title}>Profile Details</div>
            <div className={styles.formProfile}>
              <form onSubmit={submitHandler}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                      disabled={true}
                      value={hotel?.email}
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="name">Name of Hotel</label>
                    <input
                      type="email"
                      className="form-control"
                      id="name"
                      placeholder="Hotel Name"
                      disabled={true}
                      value={hotel?.name}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="contact">Contact Number of Hotel</label>
                    <input
                      type="email"
                      className="form-control"
                      id="contact"
                      placeholder="Hotel Name"
                      disabled={true}
                      value={`+91 ${hotel?.contact}`}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="address1">Address (Line 1)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address1"
                      placeholder="Enter your Address"
                      onChange={(e) =>
                        setData({ ...data, address1: e.target.value })
                      }
                      value={data?.address1}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inputAddress2">Address 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress2"
                    placeholder="Area, Locality"
                    onChange={(e) =>
                      setData({ ...data, address2: e.target.value })
                    }
                    value={data?.address2}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="inputCity">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      placeholder="Enter City Name"
                      onChange={(e) =>
                        setData({ ...data, city: e.target.value })
                      }
                      value={data?.city}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="inputState">State</label>
                    <select
                      id="inputState"
                      className="form-control"
                      onChange={(e) =>
                        setData({ ...data, state: e.target.value })
                      }
                      value={data?.state}
                    >
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Dadar and Nagar Haveli">
                        Dadar and Nagar Haveli
                      </option>
                      <option value="Daman and Diu">Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jammu and Kashmir">
                        Jammu and Kashmir
                      </option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="inputZip">PIN Code</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputZip"
                      onChange={(e) =>
                        setData({ ...data, pin: e.target.value })
                      }
                      value={data?.pin}
                      placeholder="Enter your PIN Code"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="landmark">Landmark</label>
                  <input
                    type="text"
                    className="form-control"
                    id="landmark"
                    placeholder="Enter your Landmark"
                    onChange={(e) =>
                      setData({ ...data, landmark: e.target.value })
                    }
                    value={data?.landmark}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="landmark">Short Description</label>
                  <ReactQuill
                    value={shortDesc}
                    onChange={setShortDesc}
                    className={styles.quill}
                    placeholder="Enter a Short Description of Hotel"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="landmark">Description</label>
                  <ReactQuill
                    value={desc}
                    onChange={setDesc}
                    className={styles.quill}
                  />
                </div>

                <center>
                  <button type="submit" className={styles.button}>
                    Update
                  </button>
                </center>
              </form>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
