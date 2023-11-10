import { useEffect, useState } from 'react'
import UserContext from './userContext'

const UserContextProvider = ({ children }) => {
  const [idMusic, setIdMusic] = useState("")
  const [idAlbum, setIdAlbum] = useState("")
  const [idArtist, setIdArtist] = useState("")
  const [search, setSearch] = useState("")
  const [favorite, setFavorite] = useState([])
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    console.log("Music Id: ", idMusic);
    console.log("Album Id: ", idAlbum);
    console.log("Artist Id: ", idArtist);
    console.log("Search: ", search);
    console.log("Favorite: ", favorite);
    console.log("Is Playing: ", isPlaying);
  }, [idMusic, idAlbum, idArtist, search, favorite, isPlaying])

  return (
    <UserContext.Provider value={{ idMusic, setIdMusic, idAlbum, setIdAlbum, idArtist, setIdArtist, search, setSearch, favorite, setFavorite, isPlaying, setIsPlaying}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider