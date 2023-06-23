"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useEncryptedStore } from "@/store/encrypted"
import { usePasswordStore } from "@/store/password"
import { Tag, TagMap } from "@/types"
import { Wallet } from "ethers"

import { getRawTransactionToSign } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import TagRow from "@/components/ui/tag-row"
import RequireAuth from "@/components/helper/RequireAuth"

import Channel4IconBlack from "../../assets/channel-4-icon-black.svg"

const SubmitUrl = () => {
  const { encrypted } = useEncryptedStore()
  const { password, token, userId } = usePasswordStore()
  const [title, setTitle] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [showTags, setShowTags] = useState<TagMap>(new Map())
  const [selectedTags, setSelectedTags] = useState<TagMap>(new Map())
  const [isLoading, setIsLoading] = useState(false)

  const onTitleChangeHandler = (e: { target: { value: string } }) => {
    setTitle(e.target.value)
  }

  const onUrlChangeHandler = (e: { target: { value: string } }) => {
    setUrl(e.target.value)
  }

  const getTags = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/tag"
      ).then((res) => res.json())
      let tags: TagMap = new Map()
      if ("tags" in response) {
        response.tags.forEach((tag: Tag) => {
          tags.set(tag._id, tag)
        })
      }
      setShowTags(tags)
    } catch (error) {
      console.log(error)
      setShowTags(new Map())
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  const onClickShareItHandler = async () => {
    setIsLoading(true)
    const functionName = "submitURL"
    const params = [title, url, Array.from(selectedTags.keys())]
    const metaTx = await getRawTransactionToSign(functionName, params)
    const wallet = Wallet.fromEncryptedJsonSync(encrypted!, password!)
    const signedSubmitURLtx = await wallet?.signTransaction(metaTx)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        signedMessage: signedSubmitURLtx,
        address: wallet.address,
        functionName: functionName,
        params: params,
        // TODO: temp params for mongodb
        userId: userId,
      }),
    }).then((res) => res.json())
    console.log(response)
    setTitle(null)
    setUrl(null)
    setSelectedTags(new Map())
    setIsLoading(false)
  }

  return (
    <RequireAuth>
      <div className="mx-7 flex flex-col justify-center lg:container">
        <div className="bg-c4-gradient-main my-5 flex h-40 justify-center rounded-br-3xl rounded-tl-3xl">
          <Image priority src={Channel4IconBlack} alt="Channel 4 icon black" />
        </div>
        <h2 className="my-5">
          Share your favourite websites & <span className="">spark joy</span> in
          our community with <span className="">random gems!</span> 🌐✨
        </h2>
        <div className="space-y-2 pb-4">
          <p>Enter title here</p>
          <input
            type={"text"}
            value={title || ""}
            onChange={onTitleChangeHandler}
            className="bg-gray h-12 w-full rounded-lg px-2 py-1"
          />
        </div>
        <div className="space-y-2 pb-4">
          <p>Enter URL here</p>
          <input
            type={"text"}
            value={url || ""}
            onChange={onUrlChangeHandler}
            className="bg-gray h-12 w-full rounded-lg px-2 py-1"
          />
        </div>
        <div className="space-y-2 pb-4">
          <p>Add tags (optional)</p>
          <TagRow
            selectable
            shownTags={showTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>
        <Button
          variant="outline"
          loading={isLoading}
          disabled={isLoading}
          onClick={onClickShareItHandler}
          className="rounded-full border-green-500 py-6 text-green-500"
        >
          Share it with the world
        </Button>
      </div>
    </RequireAuth>
  )
}

export default SubmitUrl
