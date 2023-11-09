import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import style from "./Artist.module.css";
import { Link } from 'react-router-dom'

const Artist = () => {
    const { idArtist, setIdMusic, setIdAlbum } = useContext(UserContext)
    const [artist, setArtist] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [track, setTrack] = useState("")

    useEffect(() => {
        const fetchMusic = async () => {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${idArtist}`);
            const data = await response.json();
            setArtist(data);
            console.log(data);

        }
        fetchMusic()
    }, [idArtist])

    useEffect(() => {
        const fetchMusic = async () => {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${idArtist}/top?limit=10`);
            const data = await response.json();
            setTrack(data);
            console.log(data);
            setIsLoading(false);
        }
        fetchMusic()
    }, [])

    const handleMusic = (key) => {
        setIdMusic(key)
        console.log(key);
    }

    const handleAlbum = (key) => {
        setIdAlbum(key)
    }


    return (
        <section className={style.artist}>
            {!idArtist ? (
                <h1 className={style.click}>Click on search and explore a world of music on your computer</h1>
            ) : (
                isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={style.artist__list}>
                        <div className={style.artist__list_singer}>
                            <h1>{artist.name}</h1>
                            <img src={artist.picture_big} alt="" />
                        </div>
                        <h2>List</h2>
                        <div className={style.artist__chart}>
                            {track.data.map((item) => (
                                <div key={item.id}>
                                    <Link to="/album">
                                        <img src={item.album.cover_small} alt="" onClick={() => handleAlbum(item.album.id)} />
                                    </Link>
                                    <p>{item.title}</p>
                                    <img src="./img/play.png" alt="" onClick={() => handleMusic(item.id)} className={style.artist__play} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </section>

    )
}
export default Artist