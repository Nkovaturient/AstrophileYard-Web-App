// const User = require('../models/user.js');
// const passport=require("passport");
// const GoogleStrategy = require('passport-google-oauth20');


// passport.initialize(); //after sessionoptions
// passport.session();

// /*GOOGLE OAuth */
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:5100/auth/google/callback",
//   },
//   async function(accessToken, refreshToken, profile, done) {
//     try{
//       // console.log('profile=', profile);
//       if (!profile) {
//         return done(new Error('No profile returned from Google'), null);
//       }
//       const existingUser= await User.findOne({googleId: profile.id});
//       if(existingUser){
//         return done(null, existingUser);
//       }
  
//       // const username = profile.emails[0].value.split('@')[0];
    
//       const newUser= new User({
//         googleId: profile.id,
//         displayName: profile.displayName,
//         email: profile.emails[0].value,
//         image: profile.photos[0].value,
//         username: profile.name.givenName,
//       });
//      await newUser.save();
//      done(null, newUser);
  
//     }
//    catch (error) {
//     console.error('Error in passport callback:', error);
//     done(error, null);
//   }
//   }));
  
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
    
//   });
//   passport.deserializeUser(async function(id, done) {
//     done(null, deserieUser);
//   });