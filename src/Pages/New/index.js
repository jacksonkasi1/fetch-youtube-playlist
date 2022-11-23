import React, { useState, useEffect } from "react"
import axios from "axios"

const New = () => {
  const [playList, setPlayList] = useState([])

  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
  const LIMIT = 5
  const SamplePlayListID = "RDmnc9pvuvSuk"

  const getPlaylist = async (playListID) => {
    if (!playListID) {
      return
    }
    try {
      // get only fist 5 video
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${LIMIT}&playlistId=${playListID}&key=${YOUTUBE_API_KEY}`
      )
      console.log(data?.items)
      setPlayList(data?.items)
    } catch (error) {
      console.warn(error.message)
      console.error(error)
    }
  }

  useEffect(() => {
    getPlaylist(SamplePlayListID)
  }, [])

  return (
    <div>
      <h1>PlayListID</h1>
      <h2>Sample Playlist ID: {SamplePlayListID}</h2>

      <br />
      {/* <pre>{JSON.stringify(playList, null, 2)}</pre> */}

      {/* play first video */}
      <h2>Fisrt video</h2>
      {playList.length > 0 && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${playList[0].snippet.resourceId.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      <br />
      <br />

      <h2>All Video from Playlist</h2>
      {/* play all videos */}
      {playList.length > 0 && (
        <div>
          {playList.map((item, index) => {
            return (
              <div key={index}>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default New
