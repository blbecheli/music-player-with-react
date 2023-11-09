import { Link } from 'react-router-dom'
import UserContext from '../../context/userContext'
import styles from './Nav.module.css'
import { useState, useContext } from 'react'



const Search = () => {
  const { setSearch } = useContext(UserContext)
  const [searching, setSearching] = useState('')


  return (
    <div className={styles.nav}>
      <Link to="/">
        <img src="./img/logo.svg" alt="" />
      </Link>
      <div className={styles.search}>
        <Link to="/search">
          <img src="./img/search.svg" alt="" onClick={() => setSearch(searching)} />
        </Link>
        <input type="text" placeholder='Search' onChange={(e) => setSearching(e.target.value)} />
      </div>
      <Link to="/favorites">
        <img src="./img/yesfavorite.svg" alt="" />        
      </Link>
    </div>
  )
}
export default Search