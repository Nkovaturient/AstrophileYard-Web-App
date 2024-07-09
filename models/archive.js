const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const archiveSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    caption:{
        type: String,
        required: true
    },
    image: {
        type: String,  //default-checks for undefined input----- set for-- when user image field is empty string
        default: "https://images.unsplash.com/photo-1710270822133-803dbff85a32?q=80&w=1477&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1710270822133-803dbff85a32?q=80&w=1477&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    description: String,
    facts: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref:'User',
    }

});

const Archive= mongoose.model('Archive', archiveSchema);
module.exports= Archive;