import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import styles from "./Favorites.module.css";

const Favorites = () => {
    // Destructuring values from UserContext
    const { favorite, setIdMusic, isPlaying, idMusic } = useContext(UserContext);

    // State to store track data and loading state
    const [track, setTrack] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch track data when the component mounts or when the favorite array changes
    useEffect(() => {
        const fetchMusic = async () => {
            // Set loading state to true
            setIsLoading(true);
            // Array to store track data for each favorite ID
            const dadosDasFaixas = [];
            // Loop through each ID in the favorite array
            for (const id of favorite) {
                // Fetch data from the Deezer API using CORS-anywhere proxy for each ID
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${id}`);
                // Parse the response to JSON
                const data = await response.json();
                // Push the track data to the array
                dadosDasFaixas.push(data);
            }
            // Set the track data in the state
            setTrack(dadosDasFaixas);
            // Set loading state to false
            setIsLoading(false);
        };

        // Call the fetchMusic function
        fetchMusic();
    }, [favorite]);

    // Log the track data to the console when the track state changes
    useEffect(() => {
        console.log(track);
    }, [track]);

    // Handle click on a track, set the selected music ID
    const handleMusic = (id) => {
        setIdMusic(id);
    }

    return (
        <section className={styles.container}>
            {!favorite ? (
                // Display a message when there are no favorites
                <div>
                    <h3>Here is where you find the tunes you love the most.</h3>
                </div>
            ) : (
                isLoading ? (
                    // Display a loading message while data is being fetched
                    <p>Carregando... aguarde</p>
                ) : (
                    <>
                        {/* Display a header for the favorites section */}
                        <div className={styles.capa}>
                            <img src="./img/favoritecapa.png" alt="Favorite cover" />
                            <h3> Here is where you find the tunes you love the most.</h3>
                        </div>
                        {/* Map through the track data and display each track in the favorites list */}
                        <div className={styles.favorite}>
                            {track.map((item) => (
                                <div key={item.id} className={styles.favorite__list} onClick={() => handleMusic(item.id)}>
                                    {/* Display artist picture, track title, and artist name */}
                                    <img src={item.artist.picture_small} alt={item.artist.name} />
                                    <p>{item.title}</p>
                                    <p>{item.artist.name}</p>
                                    {/* Display play button or equalizer gif based on the playing state */}
                                    <img
                                        src={isPlaying && idMusic === item.id ? "./img/equalizador.gif" : "./img/play.png"}
                                        alt="player"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )
            )}
        </section>
    );
};

export default Favorites;
