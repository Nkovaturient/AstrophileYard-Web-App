const express= require("express");
const router= express.Router();
const musiController=require('../controllers/music.js')

router.get('/getPlaylist', musiController.musicaly )

router.get('/refresh', musiController.refreshToken)

router.get('/playlist', musiController.getPlaylist)

module.exports=router;