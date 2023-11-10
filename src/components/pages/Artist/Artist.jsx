import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import style from "./Artist.module.css";
import { Link } from 'react-router-dom'

const Artist = () => {
    // Destructuring values from UserContext
    const { idArtist, setIdMusic, setIdAlbum, isPlaying, idMusic } = useContext(UserContext);

    // State to store artist data, track data, and loading state
    const [artist, setArtist] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [track, setTrack] = useState("");

    // Fetch artist data when the component mounts or when idArtist changes
    useEffect(() => {
        const fetchMusic = async () => {
            // Fetch data from the Deezer API using CORS-anywhere proxy
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${idArtist}`);
            // Parse the response to JSON
            const data = await response.json();
            // Set the artist data in the state
            setArtist(data);
            // Log the artist data to the console
            console.log(data);
        }
        // Call the fetchMusic function
        fetchMusic();
    }, [idArtist]);

    // Fetch top tracks of the artist when the component mounts
    useEffect(() => {
        const fetchMusic = async () => {
            // Fetch data from the Deezer API using CORS-anywhere proxy
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${idArtist}/top?limit=10`);
            // Parse the response to JSON
            const data = await response.json();
            // Set the track data in the state
            setTrack(data);
            // Log the track data to the console
            console.log(data);
            // Set loading state to false
            setIsLoading(false);
        }
        // Call the fetchMusic function
        fetchMusic();
    }, []);

    // Handle click on a track, set the selected music ID
    const handleMusic = (key) => {
        setIdMusic(key);
        console.log(key);
    }

    // Handle click on an album, set the selected album ID
    const handleAlbum = (key) => {
        setIdAlbum(key);
    }

    return (
        <section className={style.artist}>
            {!idArtist ? (
                // Display a message prompting the user to click on search
                <h1 className={style.click}>Click on search and explore a world of music on your computer</h1>
            ) : (
                isLoading ? (
                    // Display a loading message while data is being fetched
                    <p>Loading...</p>
                ) : (
                    // Display the artist details and top tracks once data is loaded
                    <div className={style.artist__list}>
                        <div className={style.artist__list_singer}>
                            {/* Display artist name and picture */}
                            <h1>{artist.name}</h1>
                            <img src={artist.picture_big} alt={artist.name} />
                        </div>
                        <h2>List</h2>
                        <div className={style.artist__chart}>
                            {/* Map through the top tracks and display each track */}
                            {track.data.map((item) => (
                                <div key={item.id}>
                                    {/* Display a link to the album with a small cover */}
                                    <Link to="/album">
                                        <img src={item.album.cover_small} alt="artist album" onClick={() => handleAlbum(item.album.id)} />
                                    </Link>
                                    {/* Display track title */}
                                    <p>{item.title}</p>
                                    {/* Display play button or equalizer gif based on the playing state */}
                                    <img
                                        src={isPlaying && idMusic === item.id ? "./img/equalizador.gif" : "./img/play.png"}
                                        alt="player"
                                        onClick={() => handleMusic(item.id)}
                                        className={style.artist__play}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </section>
    )
}

export default Artist;
