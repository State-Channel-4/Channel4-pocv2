"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tag, TagMap } from "@/types"
import { CheckCircle2, PlusCircle } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { buttonVariants } from "./button"

interface TagListProps {
  tags: TagMap
  title?: string
  selectable?: boolean
}

const TagList = ({ tags, title, selectable = false }: TagListProps) => {
  const router = useRouter()
  const [selectedTags, setSelectedTags] = useState<TagMap>(new Map())

  const handleSelectedTags = (selectedTag: Tag) => {
    const _selectedTags = selectedTags
    if (_selectedTags.has(selectedTag._id)) {
      _selectedTags.delete(selectedTag._id)
      setSelectedTags(_selectedTags)
    } else {
      _selectedTags.set(selectedTag._id, selectedTag)
      setSelectedTags(new Map(_selectedTags))
    }
  }

  const handleDiscover = () => {
    sessionStorage.setItem(
      "c4.tags",
      JSON.stringify(
        Array.from(
          selectedTags.size === 0
            ? new Map(tags).entries()
            : selectedTags.entries()
        )
      )
    )
    router.push(siteConfig.links.discover)
  }

  return (
    <section>
      {!tags && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold" id="tag-list-label">
            We couldn&apos;t find any tags. Please try again later.
          </h2>
        </div>
      )}
      {tags && (
        <div className="flex flex-col gap-2">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <div className="flex flex-wrap gap-2">
            {Array.from(tags).map(([key, tag]) => (
              <button
                className={cn(
                  "border-primary/30 text-primary flex cursor-default items-center justify-center gap-2 rounded-full border-2 px-3 py-1 text-sm font-medium transition",
                  selectable &&
                    "hover:bg-primary/30 focus:bg-primary/40 focus-visible:ring-offset-muted hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2",
                  selectable &&
                    selectedTags.size > 0 &&
                    selectedTags.has(tag._id)
                    ? "border-yellow-400"
                    : ""
                )}
                key={key}
                tabIndex={0}
                onClick={() => handleSelectedTags(tag)}
              >
                {selectable && (
                  <span>
                    {selectedTags.size > 0 && selectedTags.has(tag._id) ? (
                      <CheckCircle2 size={16} className="text-yellow-400" />
                    ) : (
                      <PlusCircle size={16} />
                    )}
                  </span>
                )}
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectable && (
        <>
          <div className="p-4"></div>
          <button
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-c4-gradient-main font-bold transition hover:scale-105"
            )}
            onClick={() => handleDiscover()}
          >
            Start your journey ✨
          </button>
        </>
      )}
    </section>
  )
}

export default TagList
