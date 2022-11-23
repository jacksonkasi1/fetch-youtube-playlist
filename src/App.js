import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import New from "./Pages/New"

// ** import pages
import PlaylistID from "./Pages/PlaylistID"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaylistID />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </Router>
  )
}

export default App
