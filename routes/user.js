const express= require("express");
const router= express.Router();
const userControllers= require('../controllers/user.js');
const wrapAsync=require("../utils/wrapAsync.js")
const passport = require("passport");
const { saveRedirectUrl, validateSign, validateLogin } = require("../middleware.js");

router.use(passport.initialize());
router.use(passport.session());

router.route("/signup")
.post( validateSign ,wrapAsync(userControllers.signUpUser))

router.route("/login")
.post(validateLogin, wrapAsync(userControllers.loginUser))


router.route("/auth/google")
.get(  passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
));
router.route('/auth/google/callback')
.get( passport.authenticate('google', {failureRedirect: '/', successRedirect: 'http://localhost:5173/', failureFlash: true}), 
   userControllers.successGoogleLogin);



router.route("/logout")
.get((userControllers.logout))

module.exports= router;