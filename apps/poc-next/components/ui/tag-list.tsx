"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tag } from "@/types"
import { CheckCircle2, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./button"

const TagList = (tags: { tags: Tag[] }) => {
  const _tags = localStorage.getItem("c4.tags")
  const { tags: tagList } = tags
  const router = useRouter()

  const [selectedTags, setSelectedTags] = useState<number[]>([])

  useEffect(() => {
    // If the tags already exist in localStorage, set them as the selected tags
    if (_tags) setSelectedTags(JSON.parse(_tags))
  }, [_tags])

  const handleSelectedTags = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId))
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  const handleDiscover = () => {
    localStorage.setItem("c4.tags", JSON.stringify(selectedTags))
    router.push("/discover")
  }

  return (
    <section>
      {tags && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold" id="tag-list-label">
            Choose as many tags as you&apos;d like.
          </h2>
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <button
                className={cn(
                  "border-primary/ text-primary hover:bg-primary/20 focus:bg-primary/30 focus-visible:ring-offset-muted flex items-center justify-center gap-2 rounded-full border-2 px-3 py-1 text-sm font-medium transition hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2",
                  selectedTags.includes(tag._id) ? "border-yellow-400" : ""
                )}
                key={tag._id}
                aria-checked="false"
                role="checkbox"
                tabIndex={0}
                onClick={() => handleSelectedTags(tag._id)}
              >
                <span>
                  {selectedTags.includes(tag._id) ? (
                    <CheckCircle2 size={16} className="text-yellow-400" />
                  ) : (
                    <PlusCircle size={16} />
                  )}
                </span>
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="p-4"></div>
      <button
        className={cn(
          buttonVariants({ size: "lg" }),
          "bg-c4-gradient-main font-bold transition hover:scale-105"
        )}
        disabled={selectedTags.length === 0}
        onClick={() => handleDiscover()}
      >
        Start your journey ✨
      </button>
    </section>
  )
}

export default TagList
