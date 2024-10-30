const cloudinary = require("cloudinary").v2;

cloudinary.config({
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

module.exports = cloudinary;
