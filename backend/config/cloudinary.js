const cloudinary = require('cloudinary').v2;

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mock_cloud',
      api_key: process.env.CLOUDINARY_API_KEY || 'mock_key',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'mock_secret'
    });
    console.log("Cloudinary configuration initialized.");
  } catch (error) {
    console.error("Cloudinary Configuration Error: ", error);
  }
};

module.exports = { cloudinary, connectCloudinary };
