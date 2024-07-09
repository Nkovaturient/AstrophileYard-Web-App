// const multer= require('multer');

// const storage=multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, cb, file)=>{
//         return cb(null, `${Date.now()}${file.originalname}}`)
//     }
// })

// const upload=multer.storage({ storage: storage});








// import { CloudinaryStorage } from "multer-storage-cloudinary";
// // import cloudinary from 'cloudinary'
// const cloudinary=require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key:process.env.cloud_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });

// const storage= new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder,
//         allowedFormats: ("png", "jpg", "jpeg")
//     },

// });

// module.exports={
//     cloudinary,
//     storage
// }
