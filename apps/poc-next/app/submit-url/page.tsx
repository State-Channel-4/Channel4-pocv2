"use client"

import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import Channel4IconBlack from "../../assets/channel-4-icon-black.svg"

const SubmitUrl = () => {
  const [url, setUrl] = useState<string | null>(null)

  const onUrlChangeHandler = (e: { target: { value: string } }) => {
    setUrl(e.target.value)
  }

  const onClickShareItHandler = () => {
    // TODO: send url to backend
  }

  return (
    <div className="mx-7 flex flex-col justify-center lg:container">
      <div className="bg-c4-gradient-main my-5 flex h-40 justify-center rounded-br-3xl rounded-tl-3xl">
        <Image priority src={Channel4IconBlack} alt="Channel 4 icon black" />
      </div>
      <h2 className="my-5">
        Share your favourite websites & <span className="">spark joy</span> in
        our community with <span className="">random gems!</span> 🌐✨
      </h2>
      <div className="space-y-2 pb-6">
        <p>Enter URL here</p>
        <input
          type={"text"}
          value={url || ""}
          onChange={onUrlChangeHandler}
          className="bg-gray h-12 w-full rounded-lg px-2 py-1"
        />
      </div>
      <div className="space-y-2 pb-6">
        <p>Add tags (optional)</p>
        <input
          type={"text"}
          /* TODO: how to save multiple tags? use a select?
          value={url || ""}
          onChange={onUrlChangeHandler}*/
          className="bg-gray h-12 w-full rounded-lg px-2 py-1"
        />
      </div>
      <Button
        variant="outline"
        onClick={onClickShareItHandler}
        className="rounded-full border-green-500 py-6 text-green-500"
      >
        Share it with the world
      </Button>
    </div>
  )
}

export default SubmitUrl
