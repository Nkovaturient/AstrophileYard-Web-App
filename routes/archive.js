const express= require("express");
const router= express.Router();
const archiveControllers=require('../controllers/archive.js')
const wrapAsync=require("../utils/wrapAsync.js")
const { validateArchive, isAuthenticated, authMiddleware } = require("../middleware.js");
const multer= require('multer');
const path=require('path')
const fs=require('fs')

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, 'uploads');
        if(fs.existsSync(dir)) {
            cb(null, dir);
        } else {
                fs.mkdir(dir, (err) => {
                    cb(err, dir);
                });
            }
        },
    filename: (req, file, cb)=>{
        return cb(null, `${file.originalname}`)
    }
})

const upload=multer({ storage: storage});

router.route("/")
.get(wrapAsync(archiveControllers.index))
.post( upload.single('image'), wrapAsync(archiveControllers.postNewArchive)) //validateArchive isauth

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

