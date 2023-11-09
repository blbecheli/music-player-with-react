import { useContext, useEffect, useState } from "react"
import style from './Releases.module.css'
import UserContext from "../../context/userContext";


const Releases = () => {
  const [chart, setChart] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);
  const {setIdMusic } = useContext(UserContext)


  useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0');     
      const data = await response.json();
      setChart(data);
      console.log(data.tracks.data);  
      setIsLoading(false)    
    }
    fetchMusic()
  },[])
 


  const handleKey = (key) => {
    setIdMusic(key)
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={style.top}>
          <h1> Top Tracks</h1>
          <div className={style.top__list}>
            {chart.tracks.data.map((item) => (
              <div key={item.id} onClick={()=>handleKey(item.id)} >
                <img src={item.album.cover_medium} alt="" />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
export default Releases