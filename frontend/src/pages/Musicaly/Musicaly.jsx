import React, { useContext, useEffect, useState } from 'react'
import './Musicaly.css'
// import './Musicaly.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleDown, faArrowCircleDown, faArrowDown, faHeadphonesAlt, faMusic } from '@fortawesome/free-solid-svg-icons'
import { storeContext } from '../../Context/storeContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
// import { Player } from 'react-spotify-web';

const Musicaly = () => {
  const { url, loading, setLoading } = useContext(storeContext);

  const [playlistData, setPlaylistData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const playTrack = (uri) => {
    setCurrentTrack(uri);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  // useEffect(() => {
  //   const fetchPlaylistData = async () => {
  //     const response = await axios.get(`${url}/musicaly/getPlaylist`);
  //     setPlaylistData(response.data.playlist);
  //   };

  //   fetchPlaylistData();
  // }, [playlistId]);

  return (
    <>

      <div className="musical-container">
        <h3>Tune in.. <FontAwesomeIcon icon={faHeadphonesAlt} /> <FontAwesomeIcon icon={faMusic} /></h3>
        {playlistData ? (
          <div>
            <img src={playlistData.images[0].url} alt={playlistData.name} />
            <h2>{playlistData.name}</h2>
            <ul>
              {playlistData.tracks.map((track) => (
                <li key={track.uri}>
                  <span>{track.title}</span> - {track.artist}
                  <button onClick={() => playTrack(track.uri)}>Play</button>
                  {isPlaying && currentTrack === track.uri && (
                    <button onClick={pauseTrack}>Pause</button>
                  )}
                </li>
              ))}
            </ul>
            {/* Optional Spotify playback */}
            {/* {isPlaying && currentTrack && (
            <Player
              uri={currentTrack}
              width={300}
              height={80}
              play={isPlaying}
              // Optional props like controls, onPlaybackChange, etc.
            />
          )} */}
          </div>
        ) : (
          <>
            <div className="load">
              <div className="load-quote">
                <em>"Music gives  Soul to the Universe, wings to the mind, flight to the imaginaion and life to Everything. "</em>
              </div>

              <iframe style={{ "borderRadius": "12px", "height": "352" }}
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7EF8wVxBVhG?utm_source=generator"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
            <br />
            <hr />

            {/* <div className="load-quote">
            <em>"Music gives a Soul to the Universe, wings to the mind, flight to the imaginaion and life to Everything. "</em>
          </div> */}
            <p style={{ color: '#fff' }}>Reload the webpage to view episodes! <FontAwesomeIcon icon={faArrowAltCircleDown}/></p>
            <div className="embed">
              <div className="episodes">
                <button className="episode" data-spotify-id="spotify:playlist:37i9dQZF1DXbIeCFU20wRm">
                  Atmospheric Sci-fi Soundtracks
                </button>
                <button className="episode" data-spotify-id="spotify:episode:6yiYRLDbBQhv3CXoQPfjMh">
                  The Smallest Ideas in the Universe
                </button>
                <button className="episode" data-spotify-id="spotify:playlist:37i9dQZF1DWXLeA8Omikj7">
                  Brain Food
                </button>
                <button className="episode" data-spotify-id="spotify:episode:2h70hGYz97ivJuTWR2Ax8M">
                  Travelling through Space and Time
                </button>
              </div>

              <div id="embed-iframe"></div>
            </div>
          </>
        )}
      </div>

    </>
  );
};

export default Musicaly;