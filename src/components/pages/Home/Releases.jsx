import { useContext, useEffect, useState } from "react";
import style from './Releases.module.css';
import UserContext from "../../context/userContext";

const Releases = () => {
  // State to store the chart data and loading state
  const [chart, setChart] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Accessing the setIdMusic function from the UserContext
  const { setIdMusic } = useContext(UserContext);

  // Fetch music data when the component mounts
  useEffect(() => {
    const fetchMusic = async () => {
      // Fetch data from the Deezer API using CORS-anywhere proxy
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0');
      // Parse the response to JSON
      const data = await response.json();
      // Set the chart data in the state
      setChart(data);
      // Log the tracks data to the console
      console.log(data.tracks.data);
      // Set loading state to false
      setIsLoading(false);
    };

    // Call the fetchMusic function
    fetchMusic();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Handle click on a track, set the selected music ID
  const handleKey = (key) => {
    setIdMusic(key);
  };

  return (
    <>
      {isLoading ? (
        // Display a loading message while data is being fetched
        <p>Loading...</p>
      ) : (
        // Display the top tracks once data is loaded
        <div className={style.top}>
          <h1> Top Tracks</h1>
          <div className={style.top__list}>
            {/* Map through the tracks and display each track */}
            {chart.tracks.data.map((item) => (
              <div key={item.id} onClick={() => handleKey(item.id)} >
                {/* Display track album cover */}
                <img src={item.album.cover_medium} alt="" />
                {/* Display track title */}
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Releases;
