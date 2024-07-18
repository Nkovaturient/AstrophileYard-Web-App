const axios=require('axios');
const qs=require('qs');
require('dotenv').config();


//rapidAPI spotify track
module.exports.musicaly=async(req,res)=>{
 
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/playlist/',
      params: {
        id: '37i9dQZF1DX4Wsb4d7NKfP'
      },
      headers: {
        'x-rapidapi-key': 'b6c6590f4fmsh1128c8c5f71d786p1e364cjsna8389274bc4a',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return res.json({success: true, data: response.data});
    } catch (err) {
      console.log(err);
    return res.json({message: `Error in rapidApi: ${err.message}`});
    }
 
}
//get access token
// module.exports.musicaly=async(req,res)=>{
//     try{
//         let response=await axios("https://accounts.spotify.com/api/token", {
//           method: 'post',
//           headers: {
//             'Content-Type':'application/x-www-form-urlencoded',
//           },
//             body:{
//               'grant_type':'client_credentials',
//               'client_id': process.env.CLIENT_ID,
//               'client_secret': process.env.CLIENT_SECRET,
//             }})
      
//           console.log(`response= ${response}`);
//          return res.json({success: true, token: response.access_token});
//     } catch(err){
//         console.log(err.message);
//         return res.json({message: `Error generating token: ${err.message}`});
//     }
// }

//refresh token
module.exports.refreshToken=async(req, res)=>{
  let refreshToken='';
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

    const accessToken = refreshResponse.data.access_token;

    return res.json({message: 'Access token refreshed successfully', token: accessToken});
} catch (error) {
    console.error('Error refreshing token:', error.message);
    return res.json({message: `Error refreshing token: ${error.message} `});
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