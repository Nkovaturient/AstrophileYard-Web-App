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

router.route("/login/verify")
.get(wrapAsync(userControllers.renderVerifyForm))

// router.route("/verify")
// .post( wrapAsync(userControllers.verifyUser));

router.route("/auth/google")
.get(  passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
));
router.route('/auth/google/callback')
.get( passport.authenticate('google', {failureRedirect: '/login', failureFlash: true}), 
   userControllers.successGoogleLogin);

// router.route('/success', userControllers.successGoogleLogin);

router.route("/logout")
.get((userControllers.logout))

module.exports= router;