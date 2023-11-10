import { useEffect, useState, useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import style from './Top.module.css';
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";

const Top = () => {
  // State to store the chart data and loading state
  const [chart, setChart] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Accessing the setIdArtist and setIdAlbum functions from the UserContext
  const { setIdArtist, setIdAlbum } = useContext(UserContext);

  // Fetch music data when the component mounts
  useEffect(() => {
    const fetchMusic = async () => {
      // Fetch data from the Deezer API using CORS-anywhere proxy
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0');
      // Parse the response to JSON
      const data = await response.json();
      // Set the chart data in the state
      setChart(data);
      // Log the albums data to the console
      console.log(data.albums.data);
      // Set loading state to false
      setIsLoading(false);
    }
    // Call the fetchMusic function
    fetchMusic();
  }, []);

  // Handle click on an artist, set the selected artist ID
  const handleIdArtist = (id) => {
    setIdArtist(id);
  }

  // Handle click on an album, set the selected album ID
  const handleAlbum = (id) => {
    setIdAlbum(id);
  }

  return (
    <>
      {isLoading ? (
        // Display a loading message while data is being fetched
        <p>Loading...</p>
      ) : (
        // Display the top albums and artists once data is loaded
        <div className={style.container}>
          <section className={style.album}>
            <Carousel>
              <h1 className={style.album__title}>Hot albums!</h1>
              {/* Map through the albums and display each album in a Carousel */}
              {chart.albums.data.map((item) => (
                <Carousel.Item key={item.id} onClick={() => handleAlbum(item.id)}>
                  <Link to="/album" key={item.id}>
                    <div>
                      {/* Display album cover */}
                      <img src={item.cover_big} alt={item.title} />
                      <Carousel.Caption>
                        {/* Display artist name and album title */}
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
              {/* Map through the top artists and display each artist */}
              {chart.artists.data.slice(0, 9).map((artist, index) => (
                <Link to="/artist" key={index}>
                  <div className={style.artist__cover} onClick={() => handleIdArtist(artist.id)}>
                    {/* Display artist picture and name */}
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
