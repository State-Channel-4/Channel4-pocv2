"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useEncryptedStore } from "@/store/encrypted"
import { usePasswordStore } from "@/store/password"
import { C4Content, TagMap } from "@/types"
import { LinkIcon, ThumbsUpIcon } from "lucide-react"
import useSWR from "swr"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import TagList from "@/components/ui/tag-list"

import SiteFrame from "./SiteFrame"
import { feedbackMessages, getMix, updateLikesInApi } from "./utils"

// TODO:
// - [ ] Get links based on tags from API
// - [x] Display link in iframe
// - [x] Add like button
// - [x] Add open in new tab button
// - [x] Add submitted by (?)
// - [x] Add micro-interactions
// - [x] Add loading animations
// - [x] Add error handling

const Discover = () => {
  const { encrypted } = useEncryptedStore()
  const { password, token, userId } = usePasswordStore()
  const selectedTags = useRef<TagMap>(new Map())
  const [activeContent, setActiveContent] = useState<C4Content | null>(null)
  const [mixIndex, setMixIndex] = useState<number>(0)
  const [mixCompleted, setMixCompleted] = useState<boolean>(false)
  const [userLikes, setUserLikes] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const currentLimit = 100
  const [shouldFetch, setShouldFetch] = useState<boolean>(true)

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? { tags: selectedTags.current, page: currentPage, limit: currentLimit }
      : null,
    getMix,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: (data) => {
        const content = data.urls
        if (!content || content.length === 0) {
          setActiveContent(null)
          return
        }

        setActiveContent(content[mixIndex])
        if (mixIndex === content.length - 1) {
          // If there's only one item in the mix
          setMixCompleted(true)
          setMixIndex(0)
          return
        }
      },
    }
  )

  const getTagsFromStore = () => {
    const tagsFromStore = sessionStorage.getItem("c4.tags")
    if (tagsFromStore) {
      try {
        const parsedTags = JSON.parse(tagsFromStore)
        if (typeof parsedTags === "object" && parsedTags !== null) {
          selectedTags.current = new Map(parsedTags)
        }
      } catch (error) {
        console.error("Error parsing JSON:", error)
      }
    }
  }

  const likeOrUnlikeActiveContent = async (contentId: string) => {
    if (!activeContent) return
    if (userLikes.includes(contentId)) {
      // TODO: Update the actual logged in user likes
      setUserLikes((prev) => prev.filter((like) => like !== contentId))
    } else {
      setUserLikes((prev) => [...prev, contentId])
    }
    activeContent.likes = userLikes.includes(contentId)
      ? activeContent.likes - 1
      : activeContent.likes + 1

    await updateLikesInApi(contentId, encrypted!, password!, token!, userId!)
  }

  const changeActiveContent = () => {
    if (!data) return
    setActiveContent(data.urls[mixIndex + 1])
    if (mixIndex + 1 === data.urls.length - 1) {
      // If the next item is the last item in the mix
      if (data.urls.length === currentLimit) {
        // If the urls returned from the API is equal to the limit there might be more items
        setCurrentPage((prev) => prev + 1)
        setShouldFetch(true)
      }
      setShouldFetch(false)
      setMixCompleted(true)
      setMixIndex(0)
      return
    }
    setMixIndex((prev) => prev + 1)
  }

  useEffect(() => {
    getTagsFromStore()
    // TODO: Intitialize user likes
  }, [])

  if (error) {
    return (
      <p className="mx-auto flex w-full items-center justify-center p-6">
        {feedbackMessages["not-found"]}
      </p>
    )
  }
  if (isLoading) {
    return (
      <p className="mx-auto flex w-full items-center justify-center p-6">
        {feedbackMessages.loading}
      </p>
    )
  }
  if (!selectedTags.current || selectedTags.current.size === 0) {
    return (
      <p className="mx-auto flex w-full items-center justify-center p-6">
        {feedbackMessages["no-tags"]}
      </p>
    )
  }

  return (
    <section className="container grid grid-cols-1 gap-10 pb-8 pt-6 xl:grid-cols-3">
      <div className="col-span-1 xl:col-span-2">
        <SiteFrame content={activeContent} />
      </div>
      <div className="col-span-1 flex max-w-[900px] flex-col items-start justify-end gap-4">
        {activeContent && (
          <div className="flex w-full flex-col gap-1 rounded-lg">
            <p className="font-mono text-sm uppercase tracking-widest text-yellow-300">
              now showing
            </p>
            <p className="text-2xl font-semibold">{activeContent.title}</p>
            <p className="text-primary/70 text-sm">
              by {activeContent.submittedBy}
            </p>
            <p className="p-2"></p>
            <div className="flex items-center gap-2">
              {/* Like button */}
              {password && token && userId ? (
                <button
                  className="bg-primary/20 hover:bg-primary/10 text-primary/70 group inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm transition-all duration-300"
                  onClick={(e) => likeOrUnlikeActiveContent(activeContent._id)}
                >
                  <ThumbsUpIcon
                    size={16}
                    className={cn(
                      "transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-yellow-300",
                      userLikes.includes(activeContent._id) && "text-yellow-300"
                    )}
                    aria-label="Like"
                  />
                  <p className="text-primary">
                    {userLikes.includes(activeContent._id) ? "Liked" : "Like"}
                  </p>
                  <p>•</p>
                  <p>{activeContent.likes}</p>
                </button>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <button className="bg-primary/20 hover:bg-primary/10 text-primary/70 group inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm transition-all duration-300">
                      <ThumbsUpIcon size={16} aria-label="Like" />
                      <p className="text-primary">{"Like"}</p>
                      <p>•</p>
                      <p>{activeContent.likes}</p>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex px-2 py-1 w-full bg-c4-gradient-blue rounded-xl"
                    side="top"
                  >
                    <Link href="/sign-in" passHref>
                      <Button variant={"link"} size={"sm"}>
                        Sign in to like
                      </Button>
                    </Link>
                  </PopoverContent>
                </Popover>
              )}
              <Link href={activeContent.url} passHref target="__blank">
                <Button variant={"link"}>
                  Go to site <LinkIcon size={14} />
                </Button>
              </Link>
            </div>

            <p className="p-1"></p>
            <Button
              className={cn(
                buttonVariants({ size: "lg", variant: "default" }),
                "rounded-full font-bold uppercase transition-all duration-500 active:scale-75"
              )}
              disabled={mixCompleted}
              loading={isLoading}
              loadingText="Checking for more content"
              role="button"
              aria-label="Next"
              onClick={changeActiveContent}
            >
              {!mixCompleted ? "watch something else" : "mix ended"}
            </Button>
            <p className="p-1"></p>
            <hr className="bg-c4-gradient-main h-1 w-full border" />
          </div>
        )}

        {selectedTags.current.size > 0 && (
          <>
            <p className="text-primary text-xs uppercase tracking-widest">
              viewing shows from
            </p>
            <TagList tags={selectedTags.current} />
            <Link href="/" passHref>
              <Button variant={"ghost"} size="sm">
                Choose other tags
              </Button>
            </Link>
          </>
        )}
      </div>
    </section>
  )
}

export default Discover
