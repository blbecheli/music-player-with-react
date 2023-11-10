import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";

const Search = () => {
    // Destructuring values from UserContext
    const { setIdMusic, setIdArtist, search } = useContext(UserContext);

    // State to store search results, loading state, and user input
    const [searching, setSearching] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch music data when the user types in the search input
    useEffect(() => {
        const fetchMusic = async () => {
            // Fetch data from the Deezer API using CORS-anywhere proxy
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${search}`);
            // Parse the response to JSON
            const data = await response.json();
            // Set the search results in the state
            setSearching(data);
            // Set loading state to false
            setIsLoading(false);
            // Log the search results to the console
            console.log(data);
        }

        // Check if the search input is not empty before fetching data
        if (search.trim() !== "") {
            fetchMusic();
        } else {
            // If the search input is empty, set search results to null
            setSearching(null);
        }
    }, [search]);

    // Function to set the selected artist ID in the context
    const handleArtist = (id) => {
        setIdArtist(id);
    }

    // Function to set the selected music ID in the context
    const handleMusic = (id) => {
        setIdMusic(id)
    }

    return (
        <>
            {!search ? (
                // Display a message prompting the user to find a world of music
                <h1 className={styles.search__title}>Find a world of music!</h1>
            ) : isLoading ? (
                // Display a loading message while data is being fetched
                <p>Loading...</p>
            ) : !searching || !searching.data ? (
                // Display a message if no results are found
                <p>No results found.</p>
            ) : (
                // Display search results
                <section className={styles.search}>
                    {searching.data.map((item) => (
                        <div key={item.id}>
                            {/* Link to the artist page with the artist ID */}
                            <Link to="/artist" key={item.artist.id} onClick={() => handleArtist(item.artist.id)}>
                                <p>{item.artist.name}</p>
                            </Link>
                            {/* Display artist picture */}
                            <img src={item.artist.picture_medium} alt="" />
                            {/* Clickable text to set the selected music ID in the context */}
                            <p onClick={() => handleMusic(item.id)}>{item.title}</p>
                        </div>
                    ))}
                </section>
            )}
        </>
    );
}

export default Search;
