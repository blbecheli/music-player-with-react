import UserContext from "../../context/userContext";
import { useContext, useEffect, useState, useRef } from "react";
import style from './Play.module.css';

const Play = () => {
  const { idMusic, favorite, setFavorite } = useContext(UserContext);

  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
    audioRef.current.volume = parseFloat(event.target.value);
  };

  useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${idMusic}`);
      const data = await response.json();
      setTrack(data);
      console.log(data);
      setIsLoading(false);
    };
    fetchMusic();
  }, [idMusic]);

  useEffect(() => {
    if (track && track.preview) {
      audioRef.current.src = track.preview;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  }, [track]);

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
        <p>Loading...</p>
      ) : (
        <div>
          <div className={style.player}>
            <div className={style.controls}>
              {track && track.artist && (
                <div className={style.controls__info}>
                  <div>
                    <img src={track.artist.picture_small} alt="" />
                  </div>
                  <div className={style.controls__info_date}>
                    <p>{track.title}</p>
                    <span>{track.artist.name}</span>
                  </div>
                </div>
              )}
              <div className={style.controls__button}>
                <button onClick={togglePlayPause}>
                  {isPlaying ? <img src="./img/pause.png" /> : <img src="./img/play.png" />}
                </button>
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
                {favorite.includes(track.id) ? (
                  <img src="./img/yesfavorite.svg" alt="" onClick={handleFavorite} />
                ) : (
                  <img src="./img/nofavorite.svg" alt="" onClick={handleFavorite} />
                )}
              </div>
            </div>
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






