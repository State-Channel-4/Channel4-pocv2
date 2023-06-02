"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { C4Content, TagMap } from "@/types"
import { LinkIcon, ThumbsUpIcon } from "lucide-react"
import useSWR, { Fetcher } from "swr"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import TagList from "@/components/ui/tag-list"

import SiteFrame from "./SiteFrame"

// TODO:
// - [ ] Get links based on tags from API
// - [x] Display link in iframe
// - [x] Add like button
// - [x] Add open in new tab button
// - [x] Add submitted by (?)
// - [x] Add micro-interactions
// - [ ] Add loading animations
// - [ ] Add error handling

const getMix: Fetcher<{ urls: C4Content[] }, TagMap> = (tags) => {
  const tagQueries = new URLSearchParams()
  tags.forEach((tag) => tagQueries.append("tags", tag._id))
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mix?${tagQueries.toString()}`
  ).then((response) => response.json())
}

const __testLink: C4Content = {
  _id: "123",
  url: "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik",
  tags: [{ _id: "1", name: "test" }],
  submittedBy: "--nightc0re--",
  createdAt: new Date("2021-10-10T12:00:00.000Z"),
  updatedAt: new Date("2021-10-10T12:00:00.000Z"),
  title: "OpenStreetMap",
  syncedToBlockchain: false,
  likes: ["abc", "def"],
}

const Discover = () => {
  const selectedTags = useRef<TagMap>(new Map())
  const [activeContent, setActiveContent] = useState<C4Content | null>(null)
  const [mixIndex, setMixIndex] = useState<number>(0)
  const [mixCompleted, setMixCompleted] = useState<boolean>(false)
  const [userLiked, setUserLiked] = useState<boolean>(false)
  const router = useRouter()

  const { data, error, isLoading } = useSWR(selectedTags.current, getMix, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: (data) => {
      const content = data.urls
      console.log("data", data)
      if (!content || content.length === 0) {
        // router.push("/")
        setActiveContent(null)
        return
      }
      // TODO: Remove test link
      data.urls.push(__testLink)
      setActiveContent(content[mixIndex])
    },
  })

  const feedbackMessages = {
    "not-found": "No content found for the selected tags. Please try again.",
    "no-tags": "No tags selected. Please select at least one tag.",
    loading: "Loading content...",
  }

  const handleLike = (id: string) => {
    // TODO: Update likes
    setUserLiked(!userLiked)
  }

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

  const changeActiveContent = () => {
    if (!data) return
    setActiveContent(data.urls[mixIndex + 1])
    if (mixIndex + 1 === data.urls.length - 1) {
      setMixCompleted(true)
      setMixIndex(0)
      return
    }
    setMixIndex((prev) => prev + 1)
  }

  useEffect(() => {
    getTagsFromStore()
  }, [])

  if (error) {
    return <p className="mx-auto flex w-full items-center justify-center p-6">{feedbackMessages["not-found"]}</p>
  }
  if (isLoading) {
    return <p className="mx-auto flex w-full items-center justify-center p-6">{feedbackMessages.loading}</p>
  }
  if (!selectedTags.current || selectedTags.current.size === 0) {
    return <p className="mx-auto flex w-full items-center justify-center p-6">{feedbackMessages["no-tags"]}</p>
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
            {/* Like button */}
            <div className="flex items-center gap-2">
              <button
                className="bg-primary/20 hover:bg-primary/10 text-primary/70 group inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm transition-all duration-300"
                onClick={(e) => handleLike(activeContent._id)}
              >
                <ThumbsUpIcon
                  size={16}
                  className={cn(
                    "transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-yellow-300",
                    userLiked && "text-yellow-300"
                  )}
                  aria-label="Like"
                />
                <p className="text-primary">{userLiked ? "Liked" : "Like"}</p>
                <p>•</p>
                <p>3</p>
              </button>
              <Link href={activeContent.url} passHref target="__blank">
                <Button
                  variant={"link"}
                  className="text-primary/70 hover:text-primary flex gap-1"
                >
                  Go to site <LinkIcon size={14} />
                </Button>
              </Link>
            </div>

            <p className="p-1"></p>
            <Button
              className={cn(
                buttonVariants({ size: "lg" , variant: 'default'}),
                "rounded-full font-bold uppercase transition-all duration-500 active:scale-75"
              )}
              disabled={mixCompleted}
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
              showing items with
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
