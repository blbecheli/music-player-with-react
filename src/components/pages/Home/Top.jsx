import { useEffect, useState, useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import style from './Top.module.css';
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";


const Top = () => {
  const [chart, setChart] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { setIdArtist, setIdAlbum } = useContext(UserContext);

  useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0');
      const data = await response.json();
      setChart(data);
      console.log(data.albums.data);
      setIsLoading(false);
    }
    fetchMusic();
  }, []);

  const handleIdArtist = (id) => {
    setIdArtist(id);
  }

  const handleAlbum = (id) => {
    setIdAlbum(id)
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={style.container}>
          <section className={style.album}>
            <Carousel>
              <h1 className={style.album__title}>Hot albums!</h1>
              {chart.albums.data.map((item) => (
                <Carousel.Item key={item.id} onClick={() => handleAlbum(item.id)}>
                  <Link to="/album" key={item.id}>
                    <div>
                      <img src={item.cover_big} alt={item.title} />
                      <Carousel.Caption>
                        <h3>{item.artist.name}</h3>
                        <p>{item.title}</p>
                      </Carousel.Caption>
                    </div>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          </section>
          <section className={style.artist}>
            <h1>Top singers</h1>
            <div className={style.artist__singers}>
              {chart.artists.data.slice(0, 9).map((artist, index) => (
                <Link to="/artist" key={index}>
                  <div className={style.artist__cover} onClick={() => handleIdArtist(artist.id)}>
                    <img src={artist.picture_medium} alt="" />
                    <p>{artist.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Top;
