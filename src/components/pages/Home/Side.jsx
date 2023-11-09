import { NavLink } from "react-router-dom"
import styles from "./Side.module.css"

const Side = () => {
  return (
    <>
      <menu className={styles.side}>        
        <li>
          <NavLink to="/">
            <img src="./img/home.svg" alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites">
            <img src="./img/playlist.svg" alt="" />
          </NavLink>
        </li>       
        <li>
          <img src="/img/profile.svg" alt="" />
        </li>
        <li>
          <img src="./img/logout.svg" alt="" />
        </li>
      </menu>
    </>
  )
}
export default Side