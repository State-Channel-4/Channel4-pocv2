"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { TagMap } from "@/types"

import { Button } from "@/components/ui/button"
import TagList from "@/components/ui/tag-list"

export default async function Discover() {
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
    <section className="md:py- container grid items-center gap-6 pb-8 pt-6">
      <div className="flex max-w-[900px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
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
      </div>
    </section>
  )
}