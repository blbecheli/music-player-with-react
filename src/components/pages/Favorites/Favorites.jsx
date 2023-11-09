import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import styles from "./Favorites.module.css";

const Favorites = () => {
    const { favorite, setIdMusic} = useContext(UserContext);
    const [track, setTrack] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMusic = async () => {
            setIsLoading(true);
            const dadosDasFaixas = [];
            for (const id of favorite) {
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${id}`);
                const data = await response.json();
                dadosDasFaixas.push(data);
            }
            setTrack(dadosDasFaixas);
            setIsLoading(false);

        };

        fetchMusic();
    }, [favorite]);

    useEffect(() => {
        console.log(track);
    }, [track]);

    const handleMusic = (id) => {   
        setIdMusic(id);
    } 


    return (

        <section className={styles.container}>
            {!favorite ? (
                <div>
                    <h3>Aqui serão listados os seus favoritos</h3>
                </div>
            ) : (
                isLoading ? (
                    <p>Carregando... aguarde</p>
                ) : (
                    <>
                        <div className={styles.capa}>
                            <img src="./img/favoritecapa.png" alt="" />
                            <h3> Here's where you find the tunes you love the most.</h3>
                        </div>
                        <div className={styles.favorite}>
                            {track.map((item) => (
                                <div key={item.id} className={styles.favorite__list} onClick={()=>handleMusic(item.id)}>
                                    <img src={item.artist.picture_small} alt="" />
                                    <p>{item.title}</p>
                                    <p>{item.artist.name}</p>
                                    <img src="./img/play.png" alt="" />
                                </div>
                            ))}
                        </div></>
                )
            )}
        </section>
    );
};

export default Favorites;
