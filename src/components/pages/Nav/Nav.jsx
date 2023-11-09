// Primeiro código
import { Link } from 'react-router-dom'
import UserContext from '../../context/userContext'
import styles from './Nav.module.css'
import { useContext } from 'react'

const Search = () => {
  const { setSearch } = useContext(UserContext)

  return (
    <div className={styles.nav}>
      <Link to="/">
        <img src="./img/logo.svg" alt="" />
      </Link>
      <div className={styles.search}>
        {/* <Link to="/search">
          <img src="./img/search.svg" alt="" />
        </Link> */}
        <Link to="/search">
        <input type="text" placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
        </Link>
      </div>
      <Link to="/favorites">
        <img src="./img/yesfavorite.svg" alt="" />        
      </Link>
    </div>
  )
}
export default Search
