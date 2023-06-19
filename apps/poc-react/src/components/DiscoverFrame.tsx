import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { API_URL } from "../constants"
import { UrlType } from "../types"

const DiscoverFrame = () => {
  const [currentUrlObj, setCurrentUrlObj] = useState<null | UrlType>(null)
  const [urlList, setUrlList] = useState<UrlType[]>([])
  const location = useLocation()
  const taglist = location.state.taglist
  console.log("taglist : ", taglist)

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch(API_URL + "/url/tag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tags: taglist,
          }),
        })

        if (!response.ok) {
          throw new Error("Error fetching URLs")
        }

        const data = await response.json()
        console.log("data : ", data)
        setUrlList(data.urls)
        setCurrentUrlObj(
          data.urls[Math.floor(Math.random() * data.urls.length)]
        )
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchUrls()
  }, [taglist])

  const handleDiscover = () => {
    const newUrlObj = urlList[Math.floor(Math.random() * urlList.length)]
    console.log("newurlobj : ", newUrlObj)
    setCurrentUrlObj(newUrlObj)
  }

  const handleVote = async (voteType: string) => {
    try {
      console.log(voteType)
      const response = await fetch(API_URL + "/vote/" + currentUrlObj?._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: taglist,
        }),
      })

      if (!response.ok) {
        throw new Error("Error during voting")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleUpvote = () => {
    handleVote("upvote")
  }

  const handleDownvote = () => {
    handleVote("downvote")
  }

  const handleOpenInNewTab = () => {
    window.open(currentUrlObj?.url, "_blank")
  }

  return (
    <div className="Discover-frame">
      <iframe
        src={currentUrlObj?.url}
        title="DiscoverFrame"
        className="Discover-iframe"
      />
      <div className="bottom-navbar">
        <button onClick={handleUpvote}>Upvote</button>
        <button onClick={handleDownvote}>Downvote</button>
        <button onClick={handleOpenInNewTab}>Open in New Tab</button>
        <button onClick={handleDiscover}>Discover</button>
      </div>
    </div>
  )
}

export default DiscoverFrame
