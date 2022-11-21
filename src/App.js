import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// ** import pages
import PlaylistID from "./Pages/PlaylistID"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaylistID />} />
      </Routes>
    </Router>
  )
}

export default App
