const axios=require('axios');

module.exports.musicaly=async(req,res)=>{
    try{
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
          res.json({success: true, token: response.access_token});
    } catch(err){
        console.log(err.message);
    }
}

module.exports.refreshToken=async(req, res)=>{
    try{
        var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  axios.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
          refresh_token = body.refresh_token;
      res.json({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
})
    }
    catch(err){
        console.log(err.message);
        return res.json({success: false, msg: err.message})
    }
}

module.exports.getPlaylist=async(req,res)=>{
    try{
        const fetchData=await axios.get('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n', {
            headers: {
                'Authorization': Bearer 
            }
        })

    } catch(err){
        console.log(err.message);
        return res.json({success: false, msg: err.message})
    }
}