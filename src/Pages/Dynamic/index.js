import React, { useState, useEffect } from "react"
import axios from "axios"
import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip"

const Dynamic = () => {
  const [playList, setPlayList] = useState([])
  const [miniPlayList, setMiniPlayList] = useState([])
  const [videoIndex, setVideoIndex] = useState(0)

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
        setMiniPlayList(data?.items.slice(1))
    } catch (error) {
      console.warn(error.message)
      console.error(error)
    }
  }

  useEffect(() => {
    getPlaylist(SamplePlayListID)
  }, [])

  //   mui styles elements
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 18 // cutomize font size
    }
  }))

  return (
    <div>
      <h1>PlayListID</h1>
      <h2>Sample Playlist ID: {SamplePlayListID}</h2>

      <br />
      {/* <pre>{JSON.stringify(playList, null, 2)}</pre> */}

      {/* play first video */}
      <h2>Fisrt video</h2>
      {playList.length > 0 && (
        <div>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${playList[videoIndex].snippet.resourceId.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {console.log("kai", playList[videoIndex])}
          <LightTooltip title={playList[videoIndex]?.snippet?.title}>
            <Typography
              variant="h5"
              component="h2"
              style={{
                width: "310px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {videoIndex + 1}. {playList[videoIndex]?.snippet?.title}
            </Typography>
          </LightTooltip>
        </div>
      )}

      <br />
      <br />

      <h2>All Video from Playlist</h2>
      {/* play all videos */}
      {miniPlayList.length > 0 && (
        <div>
          {/* {playList.slice(1)} */}
          {miniPlayList.map((item, index) => {
            return (
              <div key={index}>
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt="thumbnail"
                  style={{ width: "320px", height: "215px" }}
                  onClick={() => setVideoIndex(index + 1)}
                />

                <LightTooltip title={item.snippet.title}>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      width: "310px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {index + 1}. {item.snippet.title}
                  </Typography>
                </LightTooltip>

                <br />
              </div>
            )
          })}

          {/* remove first item inn paylist then show */}
        </div>
      )}
    </div>
  )
}

export default Dynamic
