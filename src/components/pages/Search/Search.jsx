import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";


const Search = () => {
    const { setIdMusic, setIdArtist, search } = useContext(UserContext)
    const [searching, setSearching] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMusic = async () => {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${search}`);
            const data = await response.json();
            setSearching(data);
            setIsLoading(false);
            console.log(data);
        }
        if (search.trim() !== "") {
            fetchMusic();
          } else {
            // Se a pesquisa estiver vazia, defina searching como nulo para evitar o erro
            setSearching(null);
          }
    }, [search]);

    const handleArtist = (id) => {
        setIdArtist(id);
    }

    const handleMusic = (id) => {
        setIdMusic(id)
    }

    return (
        <>
        {!search ? (
          <h1 className={styles.search__title}>Find a world of music!</h1>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : !searching || !searching.data ? (
          <p>No results found.</p>
        ) : (
          <section className={styles.search}>
            {searching.data.map((item) => (
              <div key={item.id}>
                <Link to="/artist" key={item.artist.id} onClick={() => handleArtist(item.artist.id)}>
                  <p>{item.artist.name}</p>
                </Link>
                <img src={item.artist.picture_medium} alt="" />
                <p onClick={() => handleMusic(item.id)}>{item.title}</p>
              </div>
            ))}
          </section>
        )}
      </>
    );
}
export default Search