const mongoose=require("mongoose");
const initData= require("./data.js");
const Archive = require("../../models/archive.js");

const MONGO_URL= "mongodb://127.0.0.1:27017/astrophile";

main()
.then(()=>{
    console.log("Pinged db. connected successfully!");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB= async() =>{
    await Archive.deleteMany({});
    initData.data= initData.data.map((obj) => ({ ...obj, owner: "6655ffbbd0983f16f227234a"}));
    await Archive.insertMany(initData.data);
    console.log('your data was initialized');
};

initDB();