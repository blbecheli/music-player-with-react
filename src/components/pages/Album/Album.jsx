import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import styles from "./Album.module.css";




const Album = () => {
  const { idAlbum, setIdMusic } = useContext(UserContext)
  const [album, setAlbum] = useState("");
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${idAlbum}}`);
      const data = await response.json();
      setAlbum(data);
      console.log(data);
      setIsLoading(false)
    }
    fetchMusic()
  }, [idAlbum])

  const handleAlbum = (key) => {
    setIdMusic(key)
  }

  return (
    <>
      {!idAlbum ? (
        <h1 className={styles.click}>Click on search and explore a world of music on your computer</h1>
      ) : isLoading ? (
        <p>Loading ...</p>
      ) : (
        <section className={styles.section}>
          <div className={styles.album}>
            <h2>{album.title}</h2>
            <h4>{album.artist.name}</h4>
            <img src={album.cover_big} alt="" />
          </div>
          <div className= {styles.album__list}>
            {album.tracks.data.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>                
                <img src="./img/play.png" alt="" onClick={() => handleAlbum(item.id)} className={styles.album__play}/>
              </div>
            ))}
          </div>

        </section>
      )}

    </>
  )
}
export default Album