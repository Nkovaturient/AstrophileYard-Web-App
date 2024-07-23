const cloudinary=require('cloudinary').v2;
const  { CloudinaryStorage }=require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ("png", "jpg", "jpeg", "avif", "webp") 
  },
});

module.exports= {
  cloudinary, // Export v2 specifically-cloudinary: cloudinary.v2, on import
  storage
};



