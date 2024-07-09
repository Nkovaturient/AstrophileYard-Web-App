const User = require("../models/user.js");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');



const createToken=(id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET);
}

module.exports.signUpUser = async (req, res) => {
  try {
    let { username, password, email, category } = req.body;

    const userExist=await User.findOne({email : req.body.email});
    if(userExist){
      return res.json({failure: true, message: `User already exists!`}) 
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password, salt)

    const signUser = new User({ 
      email : email, 
      username : username,
      password: hashedPassword,
     });
    signUser.category = category;

    const register = await signUser.save();
    console.log(`User entered into database- ${register}`);
    const token=createToken(register._id);
    // console.log(token);

    return res.status(200).json({success : true,  token, message: `Welcome to Astrophile Yard! You were registered successfully.`})
   
  } catch (err) {
    return res.json({failure: true, message: `Error- ${err.message}`}) 
    
  }

};


module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    
    if(!user){
      return res.status(400).json({failure : true, message: `Invalid Credentials!`})
     }

     const verifyPassword=await bcrypt.compare(password, user.password)
     if(!verifyPassword){
      return res.json({success: false, message: 'Wrong password!Try again.'})
  }

  const token= createToken(user._id);
  return res.json({success: true, token})
     
    }
     
     catch (err) {
    return res.status(400).json({success : false, message: `something went wrong-${err.message}`})
    
}
}

module.exports.authenticateLogin=async(req,res)=>{
  // req.flash("success", "Welcome back to cosmic yard!");
  let redirectUrl=res.locals.redirectUrl || "/archive";
   res.redirect(redirectUrl);
   return res.json({success: true, user: res.locals.currUser , message: `Welcome back to Astrophile Yard!`}) 

}

module.exports.successGoogleLogin=(req,res)=>{
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  // console.log(`Google user=${req.profile}, in req.user-retrieve all info`);
  return res.status(200).json({success : true, message: `${req.user.displayName}, Welcome to Astrophile Yard!`})
  
}

module.exports.logout=(req, res, next)=>{
  req.logout((err)=>{
    if(err){
     return next(err);
    }

    return res.status(200).json({success : true, message: 'Logout Successful!'})
    
  })

}




// module.exports.getFavArchive = async (req, res) => {
//   let { id } = req.params;
//   req.session.id = id;
//   res.redirect("/user/fav");
// };

// module.exports.renderFavArchive = async (req, res) => {
//   let {id, userId}=req.params;
//   console.log(`USER-ID= ${userId}`);
//   console.log(`Archives id= ${id}`);
//   res.render("archives/loading.ejs" );
//   // let favListing = await Archive.findById(id);
//   // if(favListing.owner._id.equals(res.locals.currUser._id)){
//   //   res.render("archives/fav.ejs", { favListing });

//   // }
  

// };