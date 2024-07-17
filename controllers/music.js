const axios=require('axios');

//get access token
module.exports.musicaly=async(req,res)=>{
    try{
        let response=await fetch("https://accounts.spotify.com/api/token", {
            body:{
              'Content-Type':'application/x-www-form-urlencoded',
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

//refresh token
module.exports.refreshToken=async(req, res)=>{
  try {
    const refreshResponse = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
        }
    });

    accessToken = refreshResponse.data.access_token;

    return res.json({message: 'Access token refreshed successfully', token: accessToken});
} catch (error) {
    console.error('Error refreshing token:', error.message);
    return res.json({message: 'Error refreshing token.'});
}
}


//fetch playlist
module.exports.getPlaylist=async(req,res)=>{
  const playlistId=`67oHnrWRS3mvdv9PhOXt29`;
  const accessToken= req.headers;
  try {
    const playlistResponse = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/playlists/${playlistId}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    return res.json({message: 'Playlist Fetched successfully', data: playlistResponse.data});
} catch (error) {
    console.error('Error fetching playlist:', error);
    return res.json({message: 'Error fetching playlist'});
}
}