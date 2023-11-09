import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserContextProvider from './components/context/userContextProvider'
import Play from './components/pages/Play/Play'
import Search from './components/pages/Search/Search'
import Home from './components/pages/Home/Home'
import Artist from './components/pages/Artist/Artist'
import Album from './components/pages/Album/Album'
import Nav from './components/pages/Nav/Nav'
import Favorites from './components/pages/Favorites/Favorites'



function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>

        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/album" element={<Album />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Play />

      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
