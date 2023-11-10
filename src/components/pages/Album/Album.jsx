import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import styles from "./Album.module.css";

const Album = () => {
  // Destructuring values from UserContext
  const { idAlbum, setIdMusic, idMusic, isPlaying } = useContext(UserContext);

  // State to store the album data and loading state
  const [album, setAlbum] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch album data when the component mounts or when idAlbum changes
  useEffect(() => {
    const fetchMusic = async () => {
      // Fetch data from the Deezer API using CORS-anywhere proxy
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${idAlbum}`);
      // Parse the response to JSON
      const data = await response.json();
      // Set the album data in the state
      setAlbum(data);
      // Log the album data to the console
      console.log(data);
      // Set loading state to false
      setIsLoading(false);
    }
    // Call the fetchMusic function
    fetchMusic();
  }, [idAlbum]);

  // Handle click on a track, set the selected music ID
  const handleAlbum = (key) => {
    setIdMusic(key);
  }

  return (
    <>
      {!idAlbum ? (
        // Display a message prompting the user to click on search
        <h1 className={styles.click}>Click on search and explore a world of music on your computer</h1>
      ) : isLoading ? (
        // Display a loading message while data is being fetched
        <p>Loading ...</p>
      ) : (
        // Display the album details and track list once data is loaded
        <section className={styles.section}>
          <div className={styles.album}>
            {/* Display album title, artist name, and cover */}
            <h2>{album.title}</h2>
            <h4>{album.artist.name}</h4>
            <img src={album.cover_big} alt={album.artist.name} />
          </div>
          <div className={styles.album__list}>
            {/* Map through the tracks and display each track */}
            {album.tracks.data.map((item) => (
              <div key={item.id}>
                {/* Display track title */}
                <p>{item.title}</p>
                {/* Display play button or equalizer gif based on the playing state */}
                <img
                  src={isPlaying && idMusic === item.id ? "./img/equalizador.gif" : "./img/play.png"}
                  alt="play"
                  onClick={() => handleAlbum(item.id)}
                  className={styles.album__play}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default Album;
