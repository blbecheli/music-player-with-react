import UserContext from "../../context/userContext";
import { useContext, useEffect, useState, useRef } from "react";
import style from './Play.module.css';

const Play = () => {
  // Destructuring values from UserContext
  const { idMusic, favorite, setFavorite, setIsPlaying, isPlaying } = useContext(UserContext);
  
  // State to store track data, loading state, audio volume, and audio reference
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  // Function to toggle play and pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Function to handle volume change
  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
    audioRef.current.volume = parseFloat(event.target.value);
  };

  // Fetch track data when the component mounts or when idMusic changes
  useEffect(() => {
    const fetchMusic = async () => {
      // Fetch data from the Deezer API using CORS-anywhere proxy
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${idMusic}`);
      // Parse the response to JSON
      const data = await response.json();
      // Set the track data in the state
      setTrack(data);
      // Log the track data to the console
      console.log(data);
      // Set loading state to false
      setIsLoading(false);
    };
    // Call the fetchMusic function
    fetchMusic();
  }, [idMusic]);

  // Play the audio preview when the track data changes
  useEffect(() => {
    if (track && track.preview) {
      audioRef.current.src = track.preview;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  }, [track]);

  // Function to handle adding/removing a track from favorites
  const handleFavorite = () => {
    if (favorite.includes(track.id)) {      
      setFavorite(favorite.filter(id => id !== track.id));
    } else {    
      setFavorite([...favorite, track.id]);
    }
  }  

  return (
    <>
      {isLoading ? (
        // Display a loading message while data is being fetched
        <p>Loading...</p>
      ) : (
        // Display the player when data is loaded
        <div>
          <div className={style.player}>
            <div className={style.controls}>
              {track && track.artist && (
                // Display artist information
                <div className={style.controls__info}>
                  <div>
                    <img src={track.artist.picture_small} alt={track.artist.name} />
                  </div>
                  <div className={style.controls__info_date}>
                    <p>{track.title}</p>
                    <span>{track.artist.name}</span>
                  </div>
                </div>
              )}
              <div className={style.controls__button}>
                {/* Play/Pause button */}
                <button onClick={togglePlayPause}>
                  {isPlaying ? <img src="./img/pause.png" alt="Pause" /> : <img src="./img/play.png" alt="Play" />}
                </button>
                {/* Volume control */}
                <input className={style.controls__input}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
              <div className={style.controls__favorite}>
                {/* Display favorite icon based on whether the track is in favorites or not */}
                {favorite.includes(track.id) ? (
                  <img src="./img/yesfavorite.svg" alt="Remove from favorites" onClick={handleFavorite} />
                ) : (
                  <img src="./img/nofavorite.svg" alt="Add to favorites" onClick={handleFavorite} />
                )}
              </div>
            </div>
            {/* Audio player */}
            <audio ref={audioRef} autoPlay>
              <source src={track.preview} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      )}
    </>
  );
};

export default Play;
