import React from "react";
import styles from "../../Styles/UserPages/UserUpdatePassword.module.css";
import { useSelector } from "react-redux";
import {
  changePasswordCreateOTP,
  changePasswordVerifyOTP,
  changePasswordSetPassword,
} from "../../Axios/User/Authentication.js";
import { toast } from "react-toastify";
const UserUpdatePassword = () => {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  const [otp, setOTP] = React.useState("123456");
  const [p, setP] = React.useState("");
  const [cp, setCp] = React.useState("");
  const [stage, setStage] = React.useState(1);
  const { user } = useSelector((state) => ({ ...state }));

  const stage1Handler = () => {
    changePasswordCreateOTP(user?.jwt)
      .then((res) => {
        toast.success(`OTP Sent to ${user?.email}. Please Verify Now`);
        setStage(2);
      })
      .catch((err) => {
        toast.error("There was some Error! Please Try Again");
        setStage(1);
      });
  };
  const stage2Handler = () => {
    if (otp.length !== 6) {
      toast.warning("OTP Should be 6 Digits! Please Recheck Again");
      return;
    }
    changePasswordVerifyOTP(user?.jwt, otp)
      .then((res) => {
        toast.success(`OTP Hase been Verified! ✅`);
        setStage(3);
      })
      .catch((err) => {
        toast.error(
          err.response.data
            ? err.response.data
            : "There was some Error! Please Try Again"
        );
        setStage(1);
      });
  };
  const stage3Handler = () => {
    changePasswordSetPassword(user?.jwt, p, cp)
      .then((res) => {
        toast.success(`Password Has Been Updated ✅`);
        setStage(1);
      })
      .catch((err) => {
        toast.error(
          err.response.data
            ? err.response.data
            : "There was some Error! Please Try Again"
        );
        setStage(1);
      });
  };
  return (
    <>
      {stage === 1 && (
        <div className={styles.bg}>
          <div className={styles.title}>Generate OTP</div>
          <div>
            <input
              type="email"
              disabled
              className={styles.inputfield}
              value={user?.email}
              name="x-field-1"
              tocomplete="new-field-1"
            />
          </div>
          <br />
          <button className={styles.formButton} onClick={stage1Handler}>
            Send OTP
          </button>
        </div>
      )}
      {stage === 2 && (
        <div className={styles.bg}>
          <div className={styles.title}>Validate OTP</div>
          <div>
            <input
              type="number"
              className={styles.inputfield}
              name="x-field-1"
              tocomplete="new-field-1"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <br />
          <button className={styles.formButton} onClick={stage2Handler}>
            Verify OTP
          </button>
        </div>
      )}
      {stage === 3 && (
        <div className={styles.bg}>
          <div className={styles.title}>Choose Password</div>
          <div>
            <input
              type="password"
              className={styles.inputfield}
              value={p}
              onChange={(e) => setP(e.target.value)}
              name="x-field-DFGDFZ3"
              autocomplete="new-field-3"
              placeholder="Enter Password"
            />
          </div>
          <br />
          <div>
            <input
              type="password"
              className={styles.inputfield}
              value={cp}
              onChange={(e) => setCp(e.target.value)}
              name="x-field-4"
              autocomplete="new-field-4"
              placeholder="Confirm Password"
            />
          </div>
          <br />
          <button className={styles.formButton} onClick={stage3Handler}>
            Update Password
          </button>
        </div>
      )}
    </>
  );
};

export default UserUpdatePassword;
