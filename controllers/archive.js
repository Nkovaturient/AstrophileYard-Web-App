const Archive = require("../models/archive.js");
const ExpressError = require("../utils/ExpressError.js");
const getPolyImagingData = require('../public/js/script.js');

module.exports.index = async (req, res) => {

    const allArchive = await Archive.find({});

    const data = await getPolyImagingData();
    if (data) {
        // res.render("archives/home.ejs", { allArchive, data });
        console.log("hurray!!");
        return res.status(200).json({success: true, archives: allArchive, APIData: data});
    }
    else {
        // res.render("archives/HomeNormal.ejs", { allArchive });
        return res.status(200).json({success: true, archives: allArchive});
    }
};

module.exports.showArchive = async (req, res) => {
    let { id } = req.params;
    const showList = await Archive.findById(id).populate('owner');
    if(!showList){
        return res.status(400).json({success: false, message: 'No Archive details could be found'});
    }
    // res.render("archives/show.ejs", { showList });
    return res.status(200).json({success: true, archive: showList});
};

module.exports.createArchive = async (req, res) => {
    res.render("archives/new.ejs");
};

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    let editArchive=await Archive.findById(id);
    return res.status(200).json({sucess: true, archive: editArchive})

}

module.exports.postNewArchive = async (req, res) => {

    console.log(req.file);

    const saveArchive = new Archive({
        title: req.body.title,
        caption:req.body.caption,
        image: req.file? req.file.path : req.body.image,
        description:req.body.description,
        facts:req.body.facts,
    });
    // if(req.file){
    //     saveArchive.image= req.file.path;
    // } else {
    //     saveArchive.image=  req.body.image;
    // }
    
    console.log(saveArchive);

   const savedArchive= await saveArchive.save();
    return res.status(200).json({success: true, archive: savedArchive});

};


module.exports.updateArchive = async (req, res) => {

    try{
        let { id } = req.params;
    const archive = await Archive.findById(id);
      
        if (!archive) {
            return res.status(404).json({ message: 'Archive not found' });
          }

          archive.title=req.body.title || archive.title;
          archive.caption=req.body.caption || archive.caption;
          archive.facts=req.body.facts || archive.facts;
          archive.description=req.body.description || archive.description;

          if(req.file){
            archive.image= req.file.path;
          }
          archive.image= archive.image;

          await archive.save();
          

    return res.status(200).json({success: true, message: 'Updated successfully', archive: archive});
    
    } catch(err){
        return res.status(400).json({success: false, message: `${err.message}`});
    }
};


module.exports.deleteArchive = async (req, res) => {
    let { id } = req.params;
    const dltArchive = await Archive.findByIdAndDelete(id);
    // console.log(dltArchive);
    return res.status(200).json({success: true, message: 'Deleted successfully', archive: dltArchive});

};

module.exports.gallery = async (req, res) => {
    const api_key = process.env.ASTRO_API_KEY;
    const api_secret = process.env.ASTRO_API_SECRET;
    const astroUrl=`http://astrobin.com/api/v1/image/?user=jeffbax&api_key=${api_key}&api_secret=${api_secret}&format=json`;
    try {
        let result = await fetch(astroUrl);
        let resp = await result.json();
        let resData=resp.objects;
        // console.log('ASTROBIN DATA=', resData);
        return res.status(200).json({success: true,  data: resData});
        // res.render('archives/gallery.ejs', {resData});
    }
    catch (err) {
        console.log(`Bin error=${err.message}`);
        return res.status(200).json({success: true, message: `Error-${err.message}`});
    }
}

module.exports.musicaly=async(req,res)=>{
    const url='"https://accounts.spotify.com/api/token"' //get Authorization : Bearer
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = 'https://astroyard-backend.onrender.com/archive/musicaly/callback';


  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));

}

module.exports.callback=async(req, res)=>{

}

//test archive db
// module.exports.testRoute=async(req,res)=>{
//     const newArchive= new Archive({
//         title: "The EagleFlex Nebula",
//         caption: "Behold the rise and surge of cosmic eagle-nebula",
//         description: "The eagleFlex Nebula lies around 20milion light years away formed by the collapse of two supermassive stars ejecting its long trail of proto-nebula disk till us",
//         facts: 'Flexing its wing around 20 million kms away formed out of the collision of two supermassive stars, this nebula captures the star dust and remnants spreading over 20 miles radius illuminating the cosmos'
//     });

//     console.log(newArchive);
//     await newArchive.save();
//     res.send("Archive successfully saved to db!");
// };
