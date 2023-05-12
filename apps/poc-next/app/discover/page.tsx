"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { TagMap } from "@/types"

import { Button } from "@/components/ui/button"
import TagList from "@/components/ui/tag-list"

import SiteFrame from "./SiteFrame"

const Discover = () => {
  const [selectedTags, setSelectedTags] = useState<TagMap>(new Map())

  useEffect(() => {
    const tagsFromStore = localStorage.getItem("c4.tags")
    if (tagsFromStore) {
      try {
        const parsedTags = JSON.parse(tagsFromStore)
        if (typeof parsedTags === "object" && parsedTags !== null) {
          setSelectedTags(new Map(parsedTags))
        }
      } catch (error) {
        console.error("Error parsing JSON:", error)
      }
    }
  }, [])

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
      <SiteFrame />
      </div>
    </section>
  )
}

export default Discover
