import style from './Home.module.css'

import Releases from './Releases'
import Top from './Top'

const Home = () => {
  return (
    <>
      <div className={style.home}>        
        <Top />
      </div>
      <Releases />
    </>
  )
}
export default Home