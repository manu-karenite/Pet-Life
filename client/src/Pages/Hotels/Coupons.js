import React from "react";
import styles from "../../Styles/HotelCoupons.module.css";
import {
  createCoupon,
  getCoupons,
  deleteCoupon,
} from "../../Axios/Hotel/Dashboard.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const Coupons = () => {
  const [data, setData] = React.useState({});
  const [coupons, setCoupons] = React.useState([]);
  const { hotel } = useSelector((state) => ({ ...state }));
  const getCouponsFunction = () => {
    getCoupons(hotel?.jwt)
      .then((res) => setCoupons(res.data.coupons))
      .catch((err) => {
        console.log("Coupons could not be fetched");
      });
  };
  React.useEffect(() => {
    hotel && getCouponsFunction();
  }, []);
  const handleCouponCreate = (e) => {
    e.preventDefault();
    createCoupon(hotel.jwt, hotel.email, data)
      .then((res) => {
        toast.success("Coupon has been created Successfully!");
        setData({
          name: "",
          discount: "",
          maxDiscount: "",
          minimumCart: "",
          exp: "",
        });
        getCouponsFunction();
      })
      .catch((err) => toast.error(err.response.data));
  };

  const deleteCouponHandler = (id) => {
    deleteCoupon(hotel.jwt, id)
      .then((res) => {
        toast("Coupon Deleted Successfully");
        getCouponsFunction();
      })
      .catch((err) => toast.error("Coupon Deletion Failed"));
  };
  return (
    <React.Fragment>
      <div className={styles.couponOuter}>
        <div className={`container offset-md-1`}>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center">
              <center>
                <h1 className={styles.head}>Create Coupon</h1>
              </center>
            </div>
            <div className="col-md-6 offset-md-1">
              <form className="mt-4 mt-md-0" onSubmit={handleCouponCreate}>
                <div className={styles.formGroup}>
                  <input
                    className={styles.formControl}
                    type="text"
                    placeholder="Coupon Name"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    value={data.name}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    className={styles.formControl}
                    type="number"
                    placeholder="Coupon Discount (%)"
                    min={1}
                    onChange={(e) =>
                      setData({ ...data, discount: e.target.value })
                    }
                    value={data.discount}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    className={styles.formControl}
                    type="number"
                    placeholder="Coupon Maximum Discount"
                    min={1}
                    onChange={(e) =>
                      setData({ ...data, maxDiscount: e.target.value })
                    }
                    value={data.maxDiscount}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    className={styles.formControl}
                    type="number"
                    placeholder="Minimum Cart Size"
                    min={1}
                    onChange={(e) =>
                      setData({ ...data, minimumCart: e.target.value })
                    }
                    value={data.minimumCart}
                  />
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.expiryDate}>
                    Choose Coupon Expiry Date
                  </div>
                  <input
                    type="date"
                    value={data?.exp}
                    onChange={(e) => setData({ ...data, exp: e.target.value })}
                  />
                </div>
                <div className={styles.btnDiv}>
                  <button
                    type="submit"
                    className={styles.btn}
                    disabled={
                      !data.name ||
                      !data.maxDiscount ||
                      !data.discount ||
                      !data.minimumCart
                    }
                  >
                    Create Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ backgroundColor: "#111922" }}>
        <div className="row">
          <div className="col-md-12">
            <h1 className={styles.lower__title}>
              Existing Coupons ({coupons.length})
            </h1>
            <div className={styles.list}>
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Discount %</th>
                    <th scope="col">Maximum Discount Allowed</th>
                    <th scope="col">Minimum Order Value</th>
                    <th scope="col">Valid Upto</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons &&
                    coupons.length > 0 &&
                    coupons.map((curr, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{curr.name}</td>
                          <td>{`${curr.discount}%`}</td>
                          <td>₹{curr.maxDiscount}</td>
                          <td>₹{curr.minimumCartAmount}</td>
                          <td>
                            {moment(curr.validUpto).format("DD MMMM YYYY")}
                          </td>
                          <td>
                            <DeleteOutlineOutlinedIcon
                              sx={{ fontSize: 30 }}
                              style={{ cursor: "pointer" }}
                              onClick={(e) => deleteCouponHandler(curr.name)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Coupons;
