import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dynamic from "./Pages/Dynamic"
// import Dynamic from "./Pages/Dynamic"
import New from "./Pages/New"

// ** import pages
import PlaylistID from "./Pages/PlaylistID"
import Spotify from "./Pages/Spotify"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaylistID />} />
        <Route path="/new" element={<New />} />
        <Route path="/spotify" element={<Spotify />} />
        <Route path="/dynamic" element={<Dynamic />} />
      </Routes>
    </Router>
  )
}

export default App
