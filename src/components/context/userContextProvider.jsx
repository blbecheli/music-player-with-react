import { useEffect, useState } from 'react'
import UserContext from './userContext'

const UserContextProvider = ({ children }) => {
  const [idMusic, setIdMusic] = useState("")
  const [idAlbum, setIdAlbum] = useState("")
  const [idArtist, setIdArtist] = useState("")
  const [search, setSearch] = useState("")
  const [favorite, setFavorite] = useState([908604612,1352360622])


  useEffect(() => {
    console.log("Music Id: ", idMusic);
    console.log("Album Id: ", idAlbum);
    console.log("Artist Id: ", idArtist);
    console.log("Search: ", search);
    console.log("Favorite: ", favorite);
  }, [idMusic, idAlbum, idArtist, search, favorite])

  return (
    <UserContext.Provider value={{ idMusic, setIdMusic, idAlbum, setIdAlbum, idArtist, setIdArtist, search, setSearch, favorite, setFavorite }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider