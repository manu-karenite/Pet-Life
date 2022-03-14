//create a config object
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_PASS,
});

const uploadImages = async (req, res, next) => {
  try {
    const binaryImg = req.body.binaryImg;
    const result = await cloudinary.uploader.upload(binaryImg, {
      public_id: JSON.stringify(new Date()),
      resource_type: "auto",
    });
    console.log(result);
    req.public_id = result.public_id;
    req.secure_url = result.secure_url;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json("Image Could not be Uploaded! Please Try Later");
  }
};

const destroyImage = async (req, res) => {
  const publicId = req.body.publicId;
  cloudinary.uploader.destroy(publicId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted");
    }
  });
};

module.exports = { uploadImages, destroyImage };
