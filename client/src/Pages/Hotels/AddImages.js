import React from "react";
import styles from "../../Styles/AddImages.module.css";
import Resizer from "react-image-file-resizer";
import {
  uploadImage,
  getImages,
  deleteImage,
} from "../../Axios/Hotel/Dashboard.js";
import { useSelector, useDispatch } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      720,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const AddImages = () => {
  const { hotel } = useSelector((state) => ({ ...state }));
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const setData = () => {
    getImages(hotel?.jwt)
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    setData();
  }, []);
  const uploadImageHandler = async (e) => {
    setLoading(true);
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      console.log(image);
      uploadImage(hotel?.jwt, image)
        .then((res) => {
          setData();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const removeItem = (id) => {
    console.log(id);
    deleteImage(hotel?.jwt, id, hotel?._id)
      .then((res) => {
        toast.success("Image Has Been Deleted Successfully");
        setData();
      })
      .catch((err) => toast.error("Could not Delete Image! Please Try Again"));
  };
  return (
    <div className="container-fluid">
      <div className="row" style={{ backgroundColor: "#fff" }}>
        <div className="col-md-1"></div>
        <div className="col-md-10 mt-5">
          {images.length > 0 && (
            <Carousel
              autoPlay={true}
              // centerMode={true}
              infiniteLoop={true}
              showArrows={true}
              showThumbs={false}
            >
              {images &&
                images.map((curr, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={curr?.secure_url}
                        alt="Carousel Images"
                        className={styles.image}
                      />
                    </div>
                  );
                })}
            </Carousel>
          )}
          {!images ||
            (images.length === 0 && (
              <div className={styles.noImages}>
                <div>No Images Added Yet! Select Files to Add</div>
              </div>
            ))}
          {loading && (
            <center>
              <LoadingOutlined style={{ fontSize: "80px" }} />
            </center>
          )}
          <br />
          <div className={styles.customFile}>
            <center>
              <input
                type="file"
                className={styles.imageInput}
                id="customFile"
                onChange={(e) => uploadImageHandler(e)}
                disabled={loading}
              />
            </center>
          </div>
          <div className={styles.imagesList}>
            {images &&
              images.map((curr, index) => (
                <div key={index}>
                  <div>
                    <img
                      src={curr?.secure_url}
                      alt="Hotel"
                      className={styles.currImage}
                    />
                  </div>
                  <button onClick={() => removeItem(curr?._id)}>
                    Delete Image
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    </div>
  );
};

export default AddImages;
