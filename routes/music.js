const express= require("express");
const router= express.Router();
const musiController=require('../controllers/music.js')

router.post('/getToken', musiController.musicaly )

router.get('/refresh', musiController.refreshToken)

module.exports=router;