import React, { useState, useEffect } from "react"
import axios from "axios"

// doc https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
//  sampel repo: https://github.com/makeratplay/SpotifyWebAPI/blob/main/app.js

const Spotify = () => {
  const spotifyPalyListUrl =
    "https://open.spotify.com/playlist/37i9dQZF1EIWTj4F1WthmR?si=e043b2124a604bf1"

  const spotifyClientId = "bfafda73abba47d4bd3b0c486616c0f0"
  const spotifySecretId = "1a601b70c18a409c97f915bafe2cfb99"

  const AUTHORIZE = "https://accounts.spotify.com/authorize"
  const TOKEN = "https://accounts.spotify.com/api/token"

  // token

  const [token, setToken] = useState("")

  const [playList, setPlayList] = useState([])

  const getPlaylistID = (url) => {
    const urlArray = url.split("/")
    const playListID = urlArray[urlArray.length - 1]
    return playListID
  }

  const playListID = getPlaylistID(spotifyPalyListUrl)

  const getAuth = () => {
    const url = `${AUTHORIZE}?client_id=${spotifyClientId}&response_type=code&redirect_uri=http://localhost:3000/spotify&scope=playlist-read-private%20playlist-read-collaborative&state=34fFs29kd09`
    window.open(url, "_self")
  }

  const getToken = async (code) => {
    const url = `${TOKEN}?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/spotify&client_id=${spotifyClientId}&client_secret=${spotifySecretId}`
    const { data } = await axios.post(url)
    console.log(data)
    setToken(data.access_token)
  }

  useEffect(() => {
    const url = window.location.href
    const hasCode = url.includes("?code=")

    if (hasCode) {
      const newUrl = url.split("?code=")
      window.history.pushState({}, null, newUrl[0])
      const code = newUrl[1]
      getToken(code)
    } else {
      getAuth()
    }
  }, [])

  // get spotify list of all songs funtion
  const getPlaylist = async (playListID) => {
    if (!playListID) {
      return
    }
    try {
      // get only fist 5 video from spotify
      const { data } = await axios.get(
        `https://api.spotify.com/v1/playlists/${playListID}/tracks?limit=5`
      )
      console.log(data)
      setPlayList(data.items)
    } catch (error) {
      console.warn(error.message)
      console.error(error)
    }
  }

  useEffect(() => {
    getPlaylist(playListID)
  }, [])

  return (
    <div>
      <h1>Spotify</h1>
      <h2>Sample Playlist ID: {spotifyPalyListUrl}</h2>
      <br />
      <h2>All Video from Playlist</h2>
      {/* play all videos */}
      {playList.length > 0 && (
        <div>
          {playList.map((item) => (
            <div key={item.track.id}>
              <iframe
                width="560"
                height="315"
                src={`https://open.spotify.com/embed/track/${item.track.id}`}
                title="Spotify video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <br />
              <br />

              <h2>{item.track.name}</h2>
              <h3>{item.track.artists[0].name}</h3>
              <h3>{item.track.album.name}</h3>

              <br />
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Spotify
