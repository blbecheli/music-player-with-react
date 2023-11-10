import { Link } from 'react-router-dom'
import UserContext from '../../context/userContext'
import styles from './Nav.module.css'
import { useContext } from 'react'

const Search = () => {
  // Accessing the setSearch function from UserContext
  const { setSearch } = useContext(UserContext)

  return (
    // Navigation bar containing the logo, search input, and favorites link
    <div className={styles.nav}>
      {/* Link to the home page */}
      <Link to="/">
        <img src="./img/logo.svg" alt="logo" />
      </Link>
      <div className={styles.search}>
        {/* Link to the search page */}
        <Link to="/search">
          {/* Search input field with an onChange event to update the search value in the context */}
          <input type="text" placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
        </Link>
      </div>
      {/* Link to the favorites page */}
      <Link to="/favorites">
        {/* Favorites icon */}
        <img src="./img/yesfavorite.svg" alt="logo favorites" />        
      </Link>
    </div>
  )
}

export default Search
