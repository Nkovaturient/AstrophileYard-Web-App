const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const PassportLocalMongoose= require("passport-local-mongoose");

const userSchema= new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        
        enum:["student", "astrophile", "working professional", "photographer", "stargazer", "just checking in"],
    },
    googleId: {
        type:String,
    },
    displayName: {
        type:String
    },
    image: {
        type:String
    },
    createdAt: {
        type:Date,
        default: Date.now,
    }

}
);
// userSchema.plugin(PassportLocalMongoose);

const User= mongoose.model("User", userSchema);
module.exports= User;
