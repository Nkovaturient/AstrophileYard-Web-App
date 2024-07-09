const Archive = require("./models/archive");
const { archiveSchema, signUser, loginUser } = require("./schemaValidate");
const ExpressError = require("./utils/ExpressError");
const jwt=require('jsonwebtoken');

 module.exports.validateArchive=(req, res, next)=>{ //handling server-side validation
    let { error }= archiveSchema.validate(req.body);
    // console.log(validate);
    if(error){ //if either schema object is missing
        const errMsg= error.details.map((e)=> e.message).join(",");
        return res.json({success: false, message:`${errMsg}`})
    } else{
        next();
    }
};

module.exports.validateSign=(req,res,next)=>{
    let { error }= signUser.validate(req.body);
    
    if(error){ 
        const errMsg= error.details.map((e)=> e.message).join(",");
        return res.json({success: false, message:`${errMsg}`})
    } else{
        next();
    }
}



module.exports.validateLogin=(req,res,next)=>{
    let { error }= loginUser.validate(req.body);
    
    if(error){ 
        const errMsg= error.details.map((e)=> e.message).join(",");
        return res.json({success: false, message:`${errMsg}`})
    } else{
        next();
    }
}



module.exports.authMiddleware= async(req, res, next)=>{
    const {token}= req.headers;
    if(!token){
        return res.json({success: false, message:'Unauthorized! Kindly Login to proceed.'})
    }

    try{
        const verifyToken= jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId= verifyToken.id; //match token with the registered id and store it in userId obj
        next();

    } catch(err){
        return res.json({success: false, message: `${err.message}`});
    }
}


module.exports.isAuthenticated=(req,res,next)=>{
    console.log(req.path, '-----', req.originalUrl);
   if( !req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    return res.json({message: "you must be logged in to add or edit an archive!"})
    // req.flash("error", "you must be logged in to add or edit a listing!");
    // return res.redirect("/login");

   } else{
    next();
   }
}

module.exports.saveRedirectUrl=(req,res,next)=>{ //after saving pass in user routes alongwith authenticateLogin to redirect to the same page
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();   
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    const archive=await Archive.findById(id);
    if(!archive.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not authorised to amend this Archive!");
        return res.redirect(`/archive/${id}`);
    }
        next(); 
}


