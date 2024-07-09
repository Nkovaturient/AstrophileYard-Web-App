if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const express = require('express');
const mongoose = require("mongoose");
const Archive = require('./models/archive');
const app=express();
const path=require("path");
const ejsMate= require("ejs-mate");
const methodOverride = require('method-override');
const archiveRouter=require('./routes/archive.js')
const userRouter=require('./routes/user.js')
const ExpressError = require('./utils/ExpressError.js');
const cookieParser= require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const User = require('./models/user.js');
const passport=require("passport");
const LocalStrategy=require("passport-local");
const GoogleStrategy = require('passport-google-oauth20');
const cors=require('cors');
const MongoStore = require('connect-mongo');
const PORT=process.env.PORT || 5100


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser("topsecret"));

const store= MongoStore.create({
  mongoUrl: process.env.DB_URL,
  crypto:{
      secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, 
});

store.on("error", ()=>{
  console.log("ERROR IN MONGO SESSION STORE!", err);
});

const sessionOptions=({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: Date.now() + 1000 * 60 * 60* 24* 7,
    expires: 1000 * 60 * 60* 24* 7,
    httpOnly: true
  }
});
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize()); //after sessionoptions
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.use(new GoogleStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

/*GOOGLE OAuth */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authorizationURL: "http://localhost:5173/auth/google/callback",
},
async function(accessToken, refreshToken, profile, done) {
  try{
    // console.log('profile=', profile);
    if (!profile) {
      return done(new Error('No profile returned from Google'), null);
    }
    const existingUser= await User.findOne({googleId: profile.id});
    if(existingUser){
      return done(null, existingUser);
    }

    // const username = profile.emails[0].value.split('@')[0];
  
    const newUser= new User({
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      image: profile.photos[0].value,
      username: profile.name.givenName,
    });
   await newUser.save();
   done(null, newUser);

  }
 catch (error) {
  console.error('Error in passport callback:', error);
  done(error, null);
}
}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
  
});
passport.deserializeUser(async function(id, done) {
  done(null, deserieUser);
});

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/archive", archiveRouter);
app.use("/", userRouter);


app.get("/home", async(req, res)=>{
    res.send("Astrophile Yard Activated!");
});

app.post('/spotify', async(req, res)=>{

    let response=await fetch("https://accounts.spotify.com/api/token", {
      header: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body:{
        'grant_type':'client_credentials',
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
      }})

      console.log(response);
    res.send('sent1');
  })


// app.get("/testuser", async(req,res)=>{
//   let demoUser= new User({
//     email: "siyalex@yahoo.com",
//     username: "siya",
//     googleId: 'mjcj45456nbmbk76122',
//     displayName: "Siya Alex",
//     image:'https://media.istockphoto.com/id/1621770654/photo/zodiac-spiral-and-signs-of-the-zodiac.webp?b=1&s=170667a&w=0&k=20&c=1ABl5Dbf59I7ToaZtGEHjUE3Xfjgc7jYg0qW3sRLJFg=',

//   });
//   demoUser.category="working professional";
//   const registerUser= await User.register( demoUser, "siyalex");
  
//    res.send("saved user data with the enum validations!");
//    console.log(registerUser);
// });

//handleDB VALIDATION ERROR

const handleValidationErr=(err)=>{
  console.log("Validation error occured! Please follow the rules");
  console.dir(err.message);
  return err;
}
app.use((err, req, res, next)=>{
  console.log(err.name);
  if(err.name === "ValidationError"){
   err= handleValidationErr(err);
  }
  next(err); 
});

//Page not found
app.all("*", (req, res, next)=>{
  next(new ExpressError(404, "Page Not Found!"));
}); 

app.use((err, req, res, next)=>{
    let { status=502, message='Something went wrong'}= err;
    res.status(status).render("archives/error.ejs", {err});

});

const configUrl = process.env.DB_URL;

main()
  .then(() => {
    console.log("Pinged db. connected successfully!");
    app.listen(PORT, ()=>{
        console.log('listening on port 5100');
    });
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(configUrl);
}


// // app.use("/archive", (req, res, next)=>{
//     res.render("archives/loading.ejs");
//     // next();

// //cookies for authorization,auth ***1ST**-COOKIEPARSER
// app.get("/access", (req, res)=>{
//   let { name="anonymous"}=req.cookies; //this name enter from inspect-application manually
//   res.send(`hi, ${name}`);
// });

// app.get("/cookies", (req, res)=>{
//   res.cookie("greet", "cookie");
//   console.dir(req.cookies); //now cn parse then sends cookies res
//   res.send("sent you cookie");
// });

//signedCookies }} req.cookies sends only unsigned else {} when signed
// app.get("/signed", (req,res)=>{
//   res.cookie("encode","me", {signed: true});
//   res.cookie("unsigned", "cookie");
//   res.send("rememberMe");
// });
// app.get("/verify", (req,res)=>{
//  console.log(req.signedCookies); //if signed1 tampered then false in encode&connectid
//  console.log(req.cookies);
//  res.send("verified");
// });
// app.get("/sessioncount",(req,res)=>{ **2ND**EXPRESS-SESSIONS-APP.USE
//   if(req.session.count){ //
//     req.session.count ++;
//   } else{
//     req.session.count=1;
//   }
//   res.send(`you entered the domain ${req.session.count} times`);
// });
// REgister user session
// app.get("/register", (req, res)=>{ // storing info--3RD--**
//   let {name="query your name!"}=req.query;
//   req.session.name=name;
//   res.redirect("/hello");
//   //res.send(`Welcome ${name}! Ready to kickstart.`);
// });
// app.get("/hello",(req,res)=>{ //then accessing that info
//   res.send(`hola! another session- ${req.session.name}`); //alag alag routes pr bhi ham sessions ke thru access kr skte hai
// });