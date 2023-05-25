"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Channel4Link, TagMap } from "@/types"

import { Button } from "@/components/ui/button"
import TagList from "@/components/ui/tag-list"

import SiteFrame from "./SiteFrame"

// TODO:
// - [ ] Get links based on tags from API
// - [ ] Display links in iframe
// - [ ] Add upvote/downvote buttons
// - [ ] Add open in new tab button
// - [ ] Add submitted by (?)
// - [ ] Add micro-interactions
// - [ ] Add loading animations
// - [ ] Add error handling

const getLinksForSelectedTags = async (tags: TagMap) => {
  try {
    const response = await fetch("/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags,
      }),
    })

    if (!response.ok) {
      throw new Error("Error fetching URLs")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
  }
}

const __testLink: Channel4Link = {
  _id: 123,
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
  const [selectedTags, setSelectedTags] = useState<TagMap>(new Map())
  const [activeLink, setActiveLink] = useState<Channel4Link | null>(null)

  useEffect(() => {
    const tagsFromStore = localStorage.getItem("c4.tags")
    if (tagsFromStore) {
      try {
        const parsedTags = JSON.parse(tagsFromStore)
        if (typeof parsedTags === "object" && parsedTags !== null) {
          setSelectedTags(new Map(parsedTags))
          getLinksForSelectedTags(selectedTags)
        }
      } catch (error) {
        console.error("Error parsing JSON:", error)
      }
    }

    setActiveLink(__testLink)
  }, [selectedTags])

  return (
    <section className="container grid grid-cols-1 gap-6 pb-8 pt-6 xl:grid-cols-3">
      <div className="col-span-1 flex max-w-[900px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl">
          Discover
        </h1>
        {selectedTags.size === 0 && (
          <p>
            You haven&apos;t selected any tags yet. Go to the home page to
            select some tags.
          </p>
        )}
        {selectedTags.size > 0 && (
          <TagList
            tags={selectedTags}
            title={"Showing random content with these tags:"}
          />
        )}
        <Link href="/" passHref>
          <Button variant={"secondary"} size="sm">
            Choose other tags
          </Button>
        </Link>
        <hr className="bg-c4-gradient h-1 w-full border xl:w-3/4" />
      </div>
      <div className="col-span-1 xl:col-span-2">
        {activeLink && <SiteFrame content={activeLink} />}
      </div>
    </section>
  )
}

export default Discover
