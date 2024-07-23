const express= require("express");
const router= express.Router();
const archiveControllers=require('../controllers/archive.js')
const wrapAsync=require("../utils/wrapAsync.js")
const { validateArchive, isAuthenticated, authMiddleware } = require("../middleware.js");
const multer= require('multer');
const path=require('path')
const fs=require('fs')
const {storage}=require('../utils/cloudConfig.js');

// const storage=multer.diskStorage({
//     destination: 'uploads/',
//     filename: (req, file, cb)=>{
//         return cb(null, `${file.originalname}`)
//     }
// })

const upload=multer({ storage });

router.route("/")
.get(wrapAsync(archiveControllers.index))
.post( upload.single('image'), wrapAsync(archiveControllers.postNewArchive)) //validateArchive isauth
// .post(upload.single('image'), (req,res)=>{  //checking cloudinary img upload response--then archive model reconfig
//     res.send(req.file);
//     console.log(req.file);
// });



router.route("/new")
.get( wrapAsync(archiveControllers.createArchive));

router.route('/gallery')
.get(wrapAsync(archiveControllers.gallery));

router.route("/:id")
.get(wrapAsync(archiveControllers.showArchive))
.put(authMiddleware, upload.single('image'), wrapAsync(archiveControllers.updateArchive)) //isauth
.delete(authMiddleware, wrapAsync(archiveControllers.deleteArchive)); //isauth

router.route("/:id/edit")
.get( wrapAsync(archiveControllers.renderEditForm)); //isauth


router.route("/musicaly")
.get(wrapAsync(archiveControllers.musicaly));

router.route("/musicaly/callback")
.get(archiveControllers.callback);


module.exports= router;

