"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { C4Content, TagMap } from "@/types"
import { ExternalLink, Link2Icon, LinkIcon, ThumbsUp } from "lucide-react"

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
// - [ ] Add micro-interactions
// - [ ] Add loading animations
// - [ ] Add error handling

// const getLinksForSelectedTags = async (tags: TagMap) => {
//   try {
//     const response = await fetch("/mix", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         tags,
//       }),
//     })

//     if (!response.ok) {
//       throw new Error("Error fetching URLs")
//     }

//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error:", error)
//   }
// }

const __testLink: C4Content = {
  _id: "123",
  url: "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik",
  tags: [{ _id: "1", name: "test" }],
  upvotes: 0,
  downvotes: 0,
  submittedBy: "--nightc0re--",
  createdAt: new Date("2021-10-10T12:00:00.000Z"),
  updatedAt: new Date("2021-10-10T12:00:00.000Z"),
  title: "OpenStreetMap",
  syncedToBlockchain: false,
}

const Discover = () => {
  const selectedTags = useRef<TagMap>(new Map())
  const [activeContent, setActiveContent] = useState<C4Content | null>(null)
  const [userLiked, setUserLiked] = useState<boolean>(false)
  const router = useRouter()

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

  useEffect(() => {
    getTagsFromStore()
    if (selectedTags.current.size === 0) router.push("/")
    setActiveContent(__testLink)
  }, [activeContent, selectedTags, router])

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
                <ThumbsUp
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
                buttonVariants({ size: "lg" }),
                "bg-c4-gradient-main w-3/4 rounded-l-none rounded-r-full font-bold uppercase transition-all duration-500 hover:w-full"
              )}
              onClick={() => console.log("clicked")}
            >
              change channel
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
